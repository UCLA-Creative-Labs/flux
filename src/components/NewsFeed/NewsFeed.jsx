import React, { Component } from "react";
import Firebase from "firebase";
import PropTypes from "prop-types";
import ShowPost from "./ShowPost";
import ExpandedPostModal from "./ExpandedPostModal";
import "./NewsFeed.css";

class NewsFeed extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      posts: {},
      selectedPost: "",
      showSelectedPost: false
    };
  }

  componentDidMount() {
    const postRef = Firebase.database().ref("posts");
    postRef.on("value", snapshot => {
      this.setState({
        posts: snapshot.val()
      });
    });
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
    const { userId } = this.props;
    return (
      <div>
        <div className="SearchBar">
          <input className="search" placeholder="SEARCH" />
        </div>
        <div className="flex-container">
          {Object.keys(posts)
            .reverse()
            .map(post => (
              <ShowPost
                postId={post}
                postObject={posts[post]}
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

NewsFeed.propTypes = {
  userId: PropTypes.string.isRequired
};

export default NewsFeed;
