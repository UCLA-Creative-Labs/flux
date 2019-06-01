import React from "react";
import "./ExpandedPost.css";
import PropTypes from "prop-types";

const ExpandedPost = ({ userId, text, photo }) => (
  <div className="contain">
    <div className="color">
      <h1 className="name">{userId}</h1>
    </div>
    <div className="expandedPost">
      <img
        className="profpic"
        src="https://picsum.photos/id/736/200/200"
        alt=""
      />
      <div className="postcontents">
        <p className="text">
          <span className="dropcap">{text[0]}</span>
          {text.substr(1)}
        </p>
        <img className="postphoto" src={photo} alt="" />
      </div>
    </div>
  </div>
);

ExpandedPost.propTypes = {
  userId: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  photo: PropTypes.string.isRequired
};

export default ExpandedPost;
