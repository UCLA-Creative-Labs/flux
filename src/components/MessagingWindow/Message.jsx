import React from "react";

const styles = {
  sent: {
    width: "40%",
    backgroundColor: "blue"
  },
  received: {
    width: "40%",
    backgroundColor: "white"
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
