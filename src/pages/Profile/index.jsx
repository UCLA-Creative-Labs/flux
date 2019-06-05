import React from "react";
import PropTypes from "prop-types";

import Navbar from "../../components/Navbar";
import ProfilePage from "../../components/ProfilePage";
import TopBar from "../../components/TopBar";

const Profile = props => {
  const { userId, handleLogout, notifications, makeNotification } = props;
  return (
    <div>
      <TopBar type="profile" userId={userId} handleLogout={handleLogout} />
      <Navbar
        userId={userId}
        activeTab="profile"
        notifications={notifications}
        makeNotification={makeNotification}
      />
      <ProfilePage userId={userId} handleLogout={handleLogout} {...props} />
    </div>
  );
};

Profile.propTypes = {
  userId: PropTypes.string.isRequired,
  handleLogout: PropTypes.func.isRequired,
  notifications: PropTypes.PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string,
      content: PropTypes.string,
      time: PropTypes.string
    })
  ).isRequired,
  makeNotification: PropTypes.func.isRequired
};

export default Profile;
