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

  render() {
    const { posts } = this.state;
    const { userId, type, makeNotification } = this.props;
    return (
      <div>
        {type === "home" && (
          <MakePost makeNotification={makeNotification} userId={userId} />
        )}
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
