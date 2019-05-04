import React, { Component } from "react";
import "./ShowPost.css";
import Firebase from "firebase";
import PropTypes from "prop-types";

class ShowPost extends Component {
  incrementLike(likes) {
    const { id } = this.props;
    const newLikes = likes + 1;
    Firebase.database()
      .ref("posts")
      .child(id)
      .update({ likes: newLikes });

    const { userId } = this.props;
    Firebase.database()
      .ref("users")
      .child(userId)
      .child("/likedPosts")
      .push()
      .set({ postId: id });
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
        <p>likedPosts: </p>
        <button
          type="submit"
          onClick={() => {
            this.incrementLike(postID.likes);
          }}
        >
          Like!
        </button>
      </div>
    );
  }
}

ShowPost.propTypes = {
  postID: PropTypes.shape({
    userID: PropTypes.number,
    timestamp: PropTypes.string,
    text: PropTypes.string,
    photo: PropTypes.string,
    likes: PropTypes.number
  }),
  id: PropTypes.string.isRequired,
  userId: PropTypes.number.isRequired
};

ShowPost.defaultProps = {
  postID: 0
};

export default ShowPost;
