import React, { Component } from "react";
import PropTypes from "prop-types";
import firebaseWrapper from "../../firebaseWrapper";
import MakePost from "./MakePost";
import Post from "./Post";

class NewsFeed extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      posts: {}
    };
  }

  componentDidMount() {
    const updatePosts = posts => {
      this.setState({
        posts
      });
    };

    firebaseWrapper.listenForPosts(updatePosts);
  }

  render() {
    const { posts } = this.state;
    const { userId } = this.props;
    return (
      <div>
        <MakePost userId={userId} />
        {Object.keys(posts)
          .reverse()
          .map(post => (
            <Post postId={post} postObject={posts[post]} userId={userId} />
          ))}
      </div>
    );
  }
}

NewsFeed.propTypes = {
  userId: PropTypes.string.isRequired
};
export default NewsFeed;
