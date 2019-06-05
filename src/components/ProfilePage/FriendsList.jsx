import React from "react";
import PropTypes from "prop-types";
import "./FriendsList.css";
import firebaseWrapper from "../../firebaseWrapper";

const FriendsList = ({ friends }) => {
  return (
    <div className="container">
      <h1 className="title">Friends</h1>
      {Object.keys(friends).map(friendId => {
          let profilePic;
          const setProfilePic = picture => {
            console.log(picture);
            profilePic = picture;
          }
          firebaseWrapper.getProfilePicture(friendId, setProfilePic);
          return (
          <div className="friendListing">
              <img alt="profile" className="picture" src="/static/media/default-profile-picture.995231b3.svg"/>
              <p className="friendName" key={friendId}>{friendId}</p>
            </div>
      )})}
    </div>
  );
};

FriendsList.propTypes = {
  friends: PropTypes.shape({}).isRequired
};

export default FriendsList;
