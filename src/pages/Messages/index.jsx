import React from "react";
import PropTypes from "prop-types";

import Navbar from "../../components/Navbar";
import MessageManager from "../../components/MessageManager";

const Messages = ({ userId }) => {
  return (
    <div>
      <Navbar userId={userId} activeTab="messages" />
      <MessageManager userId={userId} />
    </div>
  );
};

Messages.propTypes = {
  userId: PropTypes.string.isRequired
};

export default Messages;
