import React from "react";
import PropTypes from "prop-types";
import "./styles.css";
import NotificationBox from "./NotificationBox";

const NotificationPanel = ({ notifications }) => (
  <div className="overlay">
    <div className="NotificationPanelBackground">
      <p className="NotificationText">Notifications</p>
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
