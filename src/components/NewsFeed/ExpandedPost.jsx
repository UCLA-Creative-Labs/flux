import React, { Component } from "react";
import "./ExpandedPost.css";
import PropTypes from "prop-types";
import firebaseWrapper from "../../firebaseWrapper";

const ExpandedPost = ({ postObject }) => (
  <div className="contain">
    <div className="color">
      <h1 className="name">{postObject.userId}</h1>
    </div>
    <div className="post">
      <img className="profpic" src="https://picsum.photos/id/736/200/200" />
      <p className="text">
        <span className="dropcap">{postObject.text[0]}</span>
        {postObject.text.substr(1)}
      </p>
    </div>
  </div>
);

ExpandedPost.propTypes = {
  postObject: PropTypes.shape({
    userID: PropTypes.number,
    timestamp: PropTypes.string,
    text: PropTypes.string,
    photo: PropTypes.string,
    likes: PropTypes.number
  }).isRequired
};

export default ExpandedPost;
