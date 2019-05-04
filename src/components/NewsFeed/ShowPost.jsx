import React, { Component } from "react";
import "./ShowPost.css";
import Firebase from "firebase";
import PropTypes from "prop-types";

class ShowPost extends Component {
  incrementLike(likes) {
    const { id } = this.props;
    const newLikes = likes + 1;

    const { userId } = this.props;

    const likedPosts = Firebase.database()
      .ref("users")
      .child(userId)
      .child("/likedPosts");

    let alreadyLiked = false;
    likedPosts.once("value", function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        if (childSnapshot.val() === id) {
          alreadyLiked = true;
        }
      });
      if (alreadyLiked === false) {
        likedPosts.push(id);
        Firebase.database()
          .ref("posts")
          .child(id)
          .update({ likes: newLikes });
      }
    });
  }

  render() {
    const { postId, id } = this.props;

    return (
      <div id="ShowPostContainer">
        <p>post: {id}</p>
        <p>user_id: {postId.userId}</p>
        <p>timestamp: {postId.timestamp}</p>
        <p>text: {postId.text}</p>
        <p>
          <img className="photo" src={postId.photo} alt="" />
        </p>
        <p>likes: {postId.likes}</p>
        <button
          type="submit"
          onClick={() => {
            this.incrementLike(postId.likes);
          }}
        >
          Like!
        </button>
      </div>
    );
  }
}

ShowPost.propTypes = {
  postId: PropTypes.shape({
    userID: PropTypes.number,
    timestamp: PropTypes.string,
    text: PropTypes.string,
    photo: PropTypes.string,
    likes: PropTypes.number
  }),
  id: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired
};

ShowPost.defaultProps = {
  postId: 0
};

export default ShowPost;
