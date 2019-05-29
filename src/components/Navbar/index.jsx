import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./styles.css";

const Navbar = ({ userId, activeTab }) => {
  return (
    <nav id="navbar">
      <ul>
        <li className={activeTab === "home" ? "activeTab" : ""}>
          <Link to="/newsfeed">Home</Link>
        </li>
        <li className={activeTab === "messages" ? "activeTab" : ""}>
          <Link to="/messages">Messages</Link>
        </li>
        <li id="control-blob">Filler for control blob</li>
        <li className={activeTab === "notifications" ? "activeTab" : ""}>
          <Link to="/notificationpanel">Notifications</Link>
        </li>
        <li className={activeTab === "profile" ? "activeTab" : ""}>
          <Link to={`/user/${userId}`}>Profile</Link>
        </li>
      </ul>
    </nav>
  );
};

Navbar.propTypes = {
  userId: PropTypes.string.isRequired,
  activeTab: PropTypes.oneOf(["home", "messages", "notifications", "profile"])
    .isRequired
};

export default Navbar;
