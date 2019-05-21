import React from "react";
import "./NotificationBox.css";
import PropTypes from "prop-types";

const NotificationBox = ({ text, color, time, image }) => (
  <div className="NotificationBox">
    <div className="color-type" style={{ backgroundColor: color }} />
    <img className="image" src={require(`${image}`)} alt="Notification" />
    <p>
      {text}
      <br /> {time}
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