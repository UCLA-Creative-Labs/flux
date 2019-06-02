import React from "react";
import PropTypes from "prop-types";

import Navbar from "../../components/Navbar";
import ProfilePage from "../../components/ProfilePage";

const Profile = props => {
  const { userId, handleLogout } = props;
  return (
    <div>
      <ProfilePage userId={userId} handleLogout={handleLogout} {...props} />
      <Navbar userId={userId} activeTab="profile" />
    </div>
  );
};

Profile.propTypes = {
  userId: PropTypes.string.isRequired,
  handleLogout: PropTypes.func.isRequired
};

export default Profile;
