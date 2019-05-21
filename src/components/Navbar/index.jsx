import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Navbar = ({ userId }) => {
  return (
    <nav>
      <Link to="/newsfeed">Home</Link>
      <Link to="/messages">Messages</Link>
      <Link to={`/user/${userId}`}>Profile</Link>
    </nav>
  );
};

Navbar.propTypes = {
  userId: PropTypes.string.isRequired
};

export default Navbar;
