import React from "react";
import PropTypes from "prop-types";

import Navbar from "../../components/Navbar";
import NewsFeed from "../../components/NewsFeed";

const Home = ({ userId, makeNotification }) => {
  return (
    <div>
      <NewsFeed
        makeNotification={makeNotification}
        userId={userId}
        type="home"
      />
      <Navbar
        userId={userId}
        makeNotification={makeNotification}
        activeTab="home"
      />
    </div>
  );
};

Home.propTypes = {
  userId: PropTypes.string.isRequired,
  makeNotification: PropTypes.func.isRequired
};

export default Home;
