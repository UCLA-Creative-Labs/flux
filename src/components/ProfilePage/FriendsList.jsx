import React from "react";
import PropTypes from "prop-types";

function FriendsList({ friends }) {
  return (
    <div>
      Friends:
      {Object.keys(friends).map(friendId => (
        <div key={friendId}>{friendId}</div>
      ))}
    </div>
  );
}

FriendsList.propTypes = {
  friends: PropTypes.shape({}).isRequired
};

export default FriendsList;
