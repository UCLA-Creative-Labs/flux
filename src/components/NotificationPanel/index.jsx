import React, { Component } from "react";
import PropTypes from "prop-types";
import "./styles.css";
import NotificationBox from "./NotificationBox.jsx";

class NotificationPanel extends Component {
  render() {
    const { notifications } = this.props;
    return (
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
  }
}

NotificationPanel.propTypes = {
  notifications: PropTypes.array.isRequired
};

export default NotificationPanel;
