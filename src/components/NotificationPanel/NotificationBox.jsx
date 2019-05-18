import React from "react";
import "./NotificationBox.css";
import PropTypes from "prop-types";

const NotificationBox = ({ text, color, time }) => (
  <div className="NotificationBox">
    <div className="color-type" style={{ backgroundColor: color }} />
    <div className="image" src="./image.png" />
    <p>
      {text}
      <br /> {time}
    </p>
  </div>
);

NotificationBox.propTypes = {
  text: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired
};
export default NotificationBox;
