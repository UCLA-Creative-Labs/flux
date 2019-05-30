import React from "react";
import "./ShowPost.css";
import PropTypes from "prop-types";
import firebaseWrapper from "../../firebaseWrapper";
import Polygon from "../../images/Polygon.svg";
import seeMore from "../../images/seeMore.svg";

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

const ShowPost2 = ({ postId, postObject, onClick }) => (
  <div>
    <div className="card">
      <div className="colorbox" />
      <div className="ShowPostContainer">
        <span className="letter">{postObject.text[0]}</span>
        <img className="arrow" src={Polygon} alt="" />
        <img className="seemore" src={seeMore} alt="" />
        <button
          type="button"
          className="seemorebutton"
          onClick={() => onClick(postId)}
        />
      </div>
      <div className="r1" />
      <div className="r2" />
    </div>
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

ShowPost2.propTypes = {
  postObject: PropTypes.shape({
    userID: PropTypes.number,
    timestamp: PropTypes.string,
    text: PropTypes.string,
    photo: PropTypes.string,
    likes: PropTypes.number
  }).isRequired,
  clickHandler: PropTypes.func.isRequired
};

export default ShowPost2;
