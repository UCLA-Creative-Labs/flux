import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./styles.css";

const Navbar = ({ userId }) => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/newsfeed">Home</Link>
        </li>
        <li>
          <Link to="/messages">Messages</Link>
        </li>
        <li id="control-blob">Filler for control blob</li>
        <li>
          <Link to="/notificationpanel">Notifications</Link>
        </li>
        <li>
          <Link to={`/user/${userId}`}>Profile</Link>
        </li>
      </ul>
    </nav>
  );
};

Navbar.propTypes = {
  userId: PropTypes.string.isRequired
};

export default Navbar;
