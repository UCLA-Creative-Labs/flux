import React from "react";
import "./ShowPost.css";
import PropTypes from "prop-types";
import firebaseWrapper from "../../firebaseWrapper";

const ShowPost = ({ postId, postObject, userId }) => (
  <div id="ShowPostContainer">
    <p>post: {postId}</p>
    <p>user_id: {postObject.userId}</p>
    <p>timestamp: {postObject.timestamp}</p>
    <p>text: {postObject.text}</p>
    <p>
      <img className="photo" src={postObject.photo} alt="" />
    </p>
    <p>likes: {postObject.likes}</p>
    <button
      type="submit"
      onClick={() => {
        firebaseWrapper.incrementLike(postObject.likes, postId, userId);
      }}
    >
      Like!
    </button>
  </div>
);

ShowPost.propTypes = {
  postObject: PropTypes.shape({
    userID: PropTypes.number,
    timestamp: PropTypes.string,
    text: PropTypes.string,
    photo: PropTypes.string,
    likes: PropTypes.number
  }).isRequired,
  postId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired
};

ShowPost.defaultProps = {
  postId: 0
};

export default ShowPost;
