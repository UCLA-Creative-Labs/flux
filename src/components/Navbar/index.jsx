import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import ControlBlob from "./ControlBlob";
import NotificationPanel from "../NotificationPanel";
import "./styles.css";

class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      renderNotificationPanel: false
    };
  }

  handleClick = () => {
    const { renderNotificationPanel } = this.state;
    if (renderNotificationPanel === true)
      this.setState({ renderNotificationPanel: false });
    else this.setState({ renderNotificationPanel: true });
  };

  render() {
    const { renderNotificationPanel } = this.state;
    const { userId, activeTab, makeNotification, notifications } = this.props;
    let Notifications;
    if (renderNotificationPanel === true) {
      Notifications = (
        <NotificationPanel userId={userId} notifications={notifications} />
      );
    } else {
      Notifications = <></>;
    }
    return (
      <nav id="navbar">
        <ul>
          <li className={activeTab === "home" ? "activeTab" : ""}>
            <Link to="/newsfeed">Home</Link>
          </li>
          <li className={activeTab === "messages" ? "activeTab" : ""}>
            <Link to="/messages">Messages</Link>
          </li>
          <li id="control-blob">
            {activeTab === "home" && (
              <ControlBlob
                userId={userId}
                makeNotification={makeNotification}
              />
            )}
          </li>
          <li className={activeTab === "notifications" ? "activeTab" : ""}>
            <button onClick={this.handleClick}>Notifications</button>
            {Notifications}
          </li>
          <li className={activeTab === "profile" ? "activeTab" : ""}>
            <Link to={`/user/${userId}`}>Profile</Link>
          </li>
        </ul>
      </nav>
    );
  }
}

Navbar.defaultProps = {
  makeNotification: null
};

Navbar.propTypes = {
  userId: PropTypes.string.isRequired,
  activeTab: PropTypes.oneOf(["home", "messages", "notifications", "profile"])
    .isRequired,
  makeNotification: PropTypes.func,
  notifications: PropTypes.PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string,
      content: PropTypes.string,
      time: PropTypes.string
    })
  ).isRequired
};

export default Navbar;
