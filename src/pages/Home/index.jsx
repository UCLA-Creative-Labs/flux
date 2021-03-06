import React from "react";
import PropTypes from "prop-types";

import Navbar from "../../components/Navbar";
import NewsFeed from "../../components/NewsFeed";
import TopBar from "../../components/TopBar";

const Home = ({ userId, makeNotification, notifications, handleLogout }) => {
  return (
    <div>
      <TopBar
        userId={userId}
        type="home"
        makeNotification={makeNotification}
        handleLogout={handleLogout}
      />
      <Navbar
        userId={userId}
        makeNotification={makeNotification}
        notifications={notifications}
        activeTab="home"
      />
      <NewsFeed
        makeNotification={makeNotification}
        userId={userId}
        type="home"
      />
    </div>
  );
};

Home.propTypes = {
  userId: PropTypes.string.isRequired,
  notifications: PropTypes.PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string,
      content: PropTypes.string,
      time: PropTypes.string
    })
  ).isRequired,
  makeNotification: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired
};

export default Home;
