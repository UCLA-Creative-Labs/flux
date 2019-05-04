import React, { Component } from "react";
import "./ShowPost.css";
import PropTypes from "prop-types";
import Firebase from "firebase";

class ShowPost extends Component {
  incrementLike(likes, postID) {
    const { id } = this.props;
    const newLikes = likes + 1;
    Firebase.database()
      .ref("posts")
      .child(id)
      .update({ likes: newLikes });

    Firebase.database()
      .ref("posts")
      .child(id)
      .update({ likedPosts: [postID] });
  }

  render() {
    const { postID, id } = this.props;

    return (
      <div id="ShowPostContainer">
        <p>post: {id}</p>
        <p>user_id: {postID.userID}</p>
        <p>timestamp: {postID.timestamp}</p>
        <p>text: {postID.text}</p>
        <p>photo: {postID.photo}</p>
        <p>likes: {postID.likes}</p>
        <p>likedPosts: {postID.likedPosts}</p>
        <button
          type="submit"
          onClick={() => {
            this.incrementLike(postID.likes, id, postID.likedPosts);
          }}
        >
          Like!
        </button>
      </div>
    );
  }
}

ShowPost.propTypes = {
  postID: PropTypes.number,
  id: PropTypes.string.isRequired
};

ShowPost.defaultProps = {
  postID: 0
};

export default ShowPost;
