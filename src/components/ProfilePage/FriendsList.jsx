import React from "react";
import PropTypes from "prop-types";
import "./FriendsList.css";
import FriendListing from "./FriendListing";

const FriendsList = ({ friends, action }) => {
  return (
    <div className="container">
      {Object.keys(friends).map(friendId => (
        <FriendListing key={friendId} id={friendId} action={action} />
      ))}
    </div>
  );
};

FriendsList.propTypes = {
  friends: PropTypes.shape({}).isRequired,
  action: PropTypes.func.isRequired
};

export default FriendsList;
