import React from "react";
import "./ExpandedPost.css";
import PropTypes from "prop-types";

const ExpandedPost = ({ userId, text }) => (
  <div className="contain">
    <div className="color">
      <h1 className="name">{userId}</h1>
    </div>
    <div className="post">
      <img
        className="profpic"
        src="https://picsum.photos/id/736/200/200"
        alt=""
      />
      <p className="text">
        <span className="dropcap">{text[0]}</span>
        {text.substr(1)}
      </p>
    </div>
  </div>
);

ExpandedPost.propTypes = {
  userId: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired
};

export default ExpandedPost;
