import React from "react";
import PropTypes from "prop-types";

import Navbar from "../../components/Navbar";
import NewsFeed from "../../components/NewsFeed";
import NotificationAlert from "../../components/NotificationAlert";

const Home = ({ userId, makeNotification, notifications }) => {
  return (
    <div>
      <NotificationAlert numNotifications={notifications.length} />
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
  makeNotification: PropTypes.func.isRequired
};

export default Home;
