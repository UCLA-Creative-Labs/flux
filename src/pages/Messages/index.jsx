import React from "react";
import PropTypes from "prop-types";

import Navbar from "../../components/Navbar";
import MessageManager from "../../components/MessageManager";
import TopBar from "../../components/TopBar";

const Messages = ({ userId, notifications, makeNotification }) => {
  return (
    <div>
      <TopBar userId={userId} type="message" />
      <Navbar
        userId={userId}
        activeTab="messages"
        notifications={notifications}
        makeNotification={makeNotification}
      />
      <MessageManager userId={userId} makeNotification={makeNotification} />
    </div>
  );
};

Messages.propTypes = {
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

export default Messages;
