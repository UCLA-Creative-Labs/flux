import React, { Component } from "react";
import "./ShowPost.css";
import Firebase from "firebase";

let posts = {};
class ShowPost extends Component {
  incrementLike(likes, postID) {
    likes++;
    Firebase.database()
      .ref("posts")
      .child(this.props.id)
      .update({ likes: likes });
    Firebase.database()
      .ref("posts")
      .child(this.props.id)
      .update({ likedPosts: [postID] });
  }
  render() {
    return (
      <div id="ShowPostContainer">
        <p>post: {this.props.id}</p>
        <p>user_id: {this.props.post_id.user_id}</p>
        <p>timestamp: {this.props.post_id.timestamp}</p>
        <p>text: {this.props.post_id.text}</p>
        <p>photo: {this.props.post_id.photo}</p>
        <p>likes: {this.props.post_id.likes}</p>
        <p>likedPosts: {this.props.post_id.likedPosts}</p>
        <button
          type="submit"
          onClick={() => {
            this.incrementLike(
              this.props.post_id.likes,
              this.props.id,
              this.props.post_id.likedPosts
            );
          }}
        >
          Like!
        </button>
      </div>
    );
  }
}

ShowPost.propTypes = {
  user_id: PropTypes.number,
  timestamp: PropTypes.string,
  text: PropTypes.string,
  likes: PropTypes.number,
  id: PropTypes.string.isRequired
};

export default ShowPost;
