import React from "react";
import "./NotificationBox.css";
import PropTypes from "prop-types";

const NotificationBox = ({ text, color, time, image }) => (
  <div className="NotificationBox">
    <div className="color-type" style={{ backgroundColor: color }} />
    <img className="image" src={image} alt="Notification" />
    <p>
      {time}
      <br /> {text}
    </p>
  </div>
);

NotificationBox.propTypes = {
  text: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired
};
export default NotificationBox;
