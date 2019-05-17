import React, { Component } from "react";
import PropTypes from "prop-types";
import "./styles.css";
import NotificationBox from "./NotificationBox.jsx";

const NotificationPanel = ({ notifications }) => (
  <div className="NotificationPanel">
    {Object.keys(notifications)
      .slice(0, 10)
      .map(item => (
        <NotificationBox
          text={notifications[item].text}
          color={notifications[item].color}
          key={item}
        />
      ))}
  </div>
);

NotificationPanel.propTypes = {
  notifications: PropTypes.isRequired
};

export default NotificationPanel;
