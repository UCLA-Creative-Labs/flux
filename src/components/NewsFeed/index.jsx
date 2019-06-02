import React, { Component } from "react";
import PropTypes from "prop-types";
import firebaseWrapper from "../../firebaseWrapper";
import ShowPost from "./ShowPost";
import ExpandedPostModal from "./ExpandedPostModal";
import "./styles.css";

class NewsFeed extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: {},
      selectedPost: "",
      showSelectedPost: false,
      postText: "",
      photo: null
    };
  }

  componentDidMount() {
    const { type } = this.props;

    const updatePosts = posts => {
      this.setState({
        posts
      });
    };

    if (type === "home") {
      firebaseWrapper.listenForPosts(updatePosts);
    }
  }

  componentWillReceiveProps(props) {
    const { type, profileId } = props;

    const updatePosts = posts => {
      this.setState({
        posts
      });
    };

    if (type === "user") {
      firebaseWrapper.listenForUserPosts(profileId, updatePosts);
    } else if (type === "liked") {
      firebaseWrapper.listenForLikedPosts(profileId, updatePosts);
    }
  }

  seeMoreHandler = postId => {
    this.toggleSelectedPost();
    this.setState({ selectedPost: postId });
  };

  toggleSelectedPost = () => {
    this.setState({ showSelectedPost: true });
  };

  toggleClose = () => {
    this.setState({ showSelectedPost: false });
  };

  handleTextareaChange = event => {
    this.setState({ postText: event.target.value });
  };

  onTextareaKeyDown = event => {
    if (event.keyCode === 8) {
      event.preventDefault();

      const { userId, makeNotification } = this.props;
      const { postText, photo } = this.state;

      const resetState = () => {
        this.setState({ postText: "", photo: null });
      };

      makeNotification("makePost", `${userId}`);
      firebaseWrapper.sendPost(userId, postText, photo, resetState);
    }
  };

  render() {
    const { posts, selectedPost, showSelectedPost, postText } = this.state;
    const { type, userId } = this.props;
    return (
      <div className="newsfeed">
        {type === "home" ? (
          <div className="SearchBar">
            <input
              value={postText}
              className="search"
              placeholder="SEARCH"
              onChange={this.handleTextareaChange}
              onKeyDown={this.onTextareaKeyDown}
            />
          </div>
        ) : null}

        <div className="flex-container">
          {Object.keys(posts)
            .reverse()
            .map(postId => (
              <ShowPost
                key={postId}
                postId={postId}
                postObject={posts[postId]}
                userId={userId}
                onClick={this.seeMoreHandler}
              />
            ))}
        </div>
        {showSelectedPost && posts[selectedPost] !== undefined ? (
          <ExpandedPostModal
            userId={posts[selectedPost].userId}
            text={posts[selectedPost].text}
            photo={posts[selectedPost].photo}
            onClick={this.toggleClose}
          />
        ) : null}
      </div>
    );
  }
}

NewsFeed.defaultProps = {
  profileId: ""
};

NewsFeed.propTypes = {
  userId: PropTypes.string.isRequired,
  profileId: PropTypes.string,
  type: PropTypes.oneOf(["home", "user", "liked"]).isRequired,
  makeNotification: PropTypes.func.isRequired
};

export default NewsFeed;
