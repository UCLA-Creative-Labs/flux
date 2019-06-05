import React from "react";
import PropTypes from "prop-types";
import "./styles.css";

const NotificationAlert = ({ numNotifications }) => {
  return (
    <div className="NotificationAlert">
      <p className="AlertText">!! Alert !!</p>
      <p className="AlertNumber">{numNotifications}</p>
    </div>
  );
};

NotificationAlert.propTypes = {
  numNotifications: PropTypes.number.isRequired
};
export default NotificationAlert;
