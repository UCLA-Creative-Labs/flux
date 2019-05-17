import React from "react";
import PropTypes from "prop-types";

const FriendsList = ({ friends }) => {
  return (
    <div>
      Friends:
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
