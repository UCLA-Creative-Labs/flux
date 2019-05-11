import React, { Component } from "react";
import Firebase from "firebase";
import PropTypes from "prop-types";
import MakePost from "./MakePost";
import ShowPost from "./ShowPost";

class NewsFeed extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      posts: {}
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

  render() {
    const { posts } = this.state;
    const { userId } = this.props;
    return (
      <div>
        <MakePost userId={userId} />
        {Object.keys(posts)
          .reverse()
          .map(post => (
            <ShowPost postId={post} postObject={posts[post]} userId={userId} />
          ))}
      </div>
    );
  }
}

NewsFeed.propTypes = {
  userId: PropTypes.string.isRequired
};
export default NewsFeed;
