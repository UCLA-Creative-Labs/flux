import React from "react";
import PropTypes from "prop-types";

import Navbar from "../../components/Navbar";
import NewsFeed from "../../components/NewsFeed";

const Home = ({ userId, makeNotification, notifications }) => {
  return (
    <div>
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
  makeNotification: PropTypes.func.isRequired,
  notifications: PropTypes.PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string,
      content: PropTypes.string,
      time: PropTypes.string
    })
  ).isRequired
};

export default Home;
