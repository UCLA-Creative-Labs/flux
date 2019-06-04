import React from "react";
import PropTypes from "prop-types";

import Navbar from "../../components/Navbar";
import MessageManager from "../../components/MessageManager";

const Messages = ({ userId, notifications }) => {
  return (
    <div>
      <Navbar
        userId={userId}
        activeTab="messages"
        notifications={notifications}
      />
      <MessageManager userId={userId} />
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
  ).isRequired
};

export default Messages;
