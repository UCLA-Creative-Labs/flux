import React, { Component } from "react";
import "./ShowPost.css";
import Firebase from "firebase";
import PropTypes from "prop-types";

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
    const { postId, id } = this.props;

    return (
      <div id="ShowPostContainer">
        <p>post: {id}</p>
        <p>user_id: {postId.userID}</p>
        <p>timestamp: {postId.timestamp}</p>
        <p>text: {postId.text}</p>
        <p>
          <img className="photo" src={postId.photo} alt="" />
        </p>
        <p>likes: {postId.likes}</p>
        <p>likedPosts: {postId.likedPosts}</p>
        <button
          type="submit"
          onClick={() => {
            this.incrementLike(postId.likes, id, postId.likedPosts);
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
  id: PropTypes.string.isRequired
};

ShowPost.defaultProps = {
  postId: 0
};

export default ShowPost;
