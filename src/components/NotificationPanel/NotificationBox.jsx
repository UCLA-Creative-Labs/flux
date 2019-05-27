import React, { Component } from "react";
import "./NotificationBox.css";
import PropTypes from "prop-types";
import PlaceholderImage from "../../images/notifications/placeholder.png";
import PostImage from "../../images/notifications/post.png";
/* const NotificationTypes = {
  makePost: {
    color: "blue",
    content: `${content} made a new post!`,
    image: PostImage
  }
}; */

function NotificationBox({ content, type, time }) {
  let color = "orange";
  let image = PlaceholderImage;
  if (type === "makePost") {
    color = "blue";
    image = PostImage;
    content = `${content} made a new post!`;
  }
  return (
    <div className="NotificationBox">
      <div className="color-type" style={{ backgroundColor: color }} />
      <img className="image" src={image} alt="Notification" />
      <p className="content">
        {time}
        <br />
        {content}
      </p>
    </div>
  );
}

NotificationBox.propTypes = {
  content: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired
};
export default NotificationBox;
