import React from "react";
import PropTypes from "prop-types";
import "../../colors.css";

const styles = {
  sent: {
    width: "40%",
    backgroundColor: "var(--light-teal)"
  },
  received: {
    width: "40%",
    backgroundColor: "var(--blueberry)"
  }
};

function Message({ text, sent }) {
  const styling = sent ? styles.sent : styles.received;
  return <div style={styling}>{text}</div>;
}

Message.propTypes = {
  text: PropTypes.string.isRequired,
  sent: PropTypes.bool.isRequired
};

export default Message;
