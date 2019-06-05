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
    const { makeNotification } = this.props;
    makeNotification("clickTab", "You just clicked a tab!");
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
      Notifications = null;
    }
    return (
      <nav id="navbar">
        <ul>
          <li
            className={
              activeTab === "home" && !renderNotificationPanel
                ? "activeTab"
                : ""
            }
          >
            <Link
              to="/newsfeed"
              onClick={() => makeNotification("clickTab", "")}
            >
              Home
            </Link>
          </li>
          <li
            className={
              activeTab === "messages" && !renderNotificationPanel
                ? "activeTab"
                : ""
            }
          >
            <Link
              to="/messages"
              onClick={() => makeNotification("clickTab", "")}
            >
              Messages
            </Link>
          </li>
          <li id="control-blob">
            {activeTab === "home" && (
              <ControlBlob
                userId={userId}
                makeNotification={makeNotification}
                onClick={() => makeNotification("clickTab", "")}
              />
            )}
          </li>
          <li
            className={renderNotificationPanel ? "activeTab" : ""}
            id="notificationTab"
          >
            <button type="button" onClick={this.handleClick}>
              Notifications
            </button>
            <div id="numNot">{notifications.length}</div>
            {Notifications}
          </li>
          <li
            className={
              activeTab === "profile" && !renderNotificationPanel
                ? "activeTab"
                : ""
            }
          >
            <Link
              to={`/user/${userId}`}
              onClick={() => makeNotification("clickTab", "")}
            >
              Profile
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}

Navbar.propTypes = {
  userId: PropTypes.string.isRequired,
  activeTab: PropTypes.oneOf(["home", "messages", "notifications", "profile"])
    .isRequired,
  makeNotification: PropTypes.func.isRequired,
  notifications: PropTypes.PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string,
      content: PropTypes.string,
      time: PropTypes.string
    })
  ).isRequired
};

export default Navbar;
