import React from "react";
import PropTypes from "prop-types";
import "./styles.css";
import NotificationBox from "./NotificationBox";

/* window.onload = function() {
  console.log("darkness");
  document.getElementById("overlay").style = "display: block";
};

window.onunload = function() {
  console.log("hello");
  document.getElementById("overlay").style = "display: none";
}; */

const NotificationPanel = ({ notifications }) => (
  <div>
    <div className="overlay" />
    <div className="NotificationPanelBackground" />
    <div className="NotificationPanel">
      {Object.keys(notifications).map(item => (
        <NotificationBox
          text={notifications[item].text}
          color={notifications[item].color}
          time={notifications[item].time}
          image={notifications[item].image}
          key={item}
        />
      ))}
    </div>
  </div>
);

NotificationPanel.propTypes = {
  notifications: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      color: PropTypes.string,
      time: PropTypes.string,
      image: PropTypes.string
    })
  ).isRequired
};

export default NotificationPanel;