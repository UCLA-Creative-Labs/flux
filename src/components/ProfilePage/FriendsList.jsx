import React from "react";
import PropTypes from "prop-types";

<<<<<<< 97df7aeacb97f1a983eed4dc1f97fc6c7735be5b
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
=======
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
>>>>>>> eslint fixes

FriendsList.propTypes = {
  friends: PropTypes.shape({}).isRequired
};

export default FriendsList;
