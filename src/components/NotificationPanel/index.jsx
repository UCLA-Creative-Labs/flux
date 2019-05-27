import React from "react";
import PropTypes from "prop-types";
import "./styles.css";
import NotificationBox from "./NotificationBox";

const NotificationPanel = ({ notifications }) => (
  <div className="overlay">
    <div className="NotificationPanelBackground">
      <p className="NotificationText">Notifications</p>
      <div className="NotificationPanel">
        {Object.keys(notifications).map(notificationId => (
          <NotificationBox
            type={notifications[notificationId].type}
            content={notifications[notificationId].content}
            key={notificationId}
          />
        ))}
      </div>
    </div>
  </div>
);

NotificationPanel.propTypes = {
  notifications: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string,
      content: PropTypes.string
    })
  ).isRequired
};

export default NotificationPanel;
