import React from "react";
import PropTypes from "prop-types";
import "./FriendsList.css";
import FriendListing from "./FriendListing";

const FriendsList = ({ friends }) => {
  return (
    <div className="container">
      <h1 className="title">FRIENDS</h1>
      {Object.keys(friends).map(friendId => (
        <FriendListing key={friendId} id={friendId} />
      ))}
      ;
    </div>
  );
};

FriendsList.propTypes = {
  friends: PropTypes.shape({}).isRequired
};

export default FriendsList;
