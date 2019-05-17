import React, { Component } from "react";
import PropTypes from "prop-types";
import firebaseWrapper from "../../firebaseWrapper";
import MakePost from "./MakePost";
import Post from "./Post";

class NewsFeed extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: {}
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
    const { type, userId } = props;

    const updatePosts = posts => {
      this.setState({
        posts
      });
    };

    if (type === "user") {
      firebaseWrapper.getUserPosts(userId, updatePosts);
    } else if (type === "liked") {
      firebaseWrapper.getLikedPosts(userId, updatePosts);
    }
  }

  render() {
    const { posts } = this.state;
    const { userId } = this.props;
    return (
      <div>
        <MakePost userId={userId} />
        {Object.keys(posts)
          .reverse()
          .map(postId => (
            <Post
              key={postId}
              postId={postId}
              postObject={posts[postId]}
              userId={userId}
            />
          ))}
      </div>
    );
  }
}

NewsFeed.propTypes = {
  userId: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["home", "user", "liked"]).isRequired
};
export default NewsFeed;
