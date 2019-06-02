import React from "react";
import PropTypes from "prop-types";

import Navbar from "../../components/Navbar";
import ProfilePage from "../../components/ProfilePage";

const Profile = props => {
  const { userId, handleLogout, notifications } = props;
  return (
    <div>
      <Navbar
        userId={userId}
        activeTab="profile"
        notifications={notifications}
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
  ).isRequired
};

export default Profile;
