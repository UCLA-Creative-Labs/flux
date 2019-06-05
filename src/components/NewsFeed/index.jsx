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
      showSelectedPost: false
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

  render() {
    const { posts, selectedPost, showSelectedPost } = this.state;
    const { userId, type } = this.props;

    return (
      <div className="newsfeed">
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
                type={type}
              />
            ))}
        </div>
        {showSelectedPost && posts[selectedPost] !== undefined ? (
          <ExpandedPostModal
            userId={posts[selectedPost].userId}
            text={posts[selectedPost].text}
            photo={posts[selectedPost].photo}
            likes={posts[selectedPost].likes}
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
  type: PropTypes.oneOf(["home", "user", "liked"]).isRequired
};

export default NewsFeed;
