import React from "react";
import PropTypes from "prop-types";

const FriendsList = ({ friends }) => {
  return (
    <div>
      <h1>Friends:</h1>
      {Object.keys(friends).map(friendId => (
        <p key={friendId}>{friendId}</p>
      ))}
    </div>
  );
};

FriendsList.propTypes = {
  friends: PropTypes.shape({}).isRequired
};

export default FriendsList;
