import React from "react";
import PropTypes from "prop-types";
import "../../colors.css";

const rb = require("../../images/ReceivedBubble.svg");
const sb = require("../../images/SentBubble.svg");

const styles = {
  sent: {
    display: "inline-block",
    boxSizing: "border-box",
    height: "200px",
    width: "200px",
    // borderRadius: "50%",
    // backgroundColor: "var(--light-teal)"
    backgroundImage: `url(${sb})`,
    backgroundRepeat: "no-repeat"
  },
  received: {
    display: "inline-block",
    boxSizing: "border-box",
    height: "200px",
    width: "200px",
    // borderRadius: "50%",
    // backgroundColor: "var(--blueberry)"
    backgroundImage: `url(${rb})`,
    backgroundRepeat: "no-repeat"
  }
};

function Message({ text, sent }) {
  const styling = sent ? styles.sent : styles.received;
  return (
    <div style={styling}>
      <p style={{ padding: "50px", textAlign: "center" }}>{text}</p>
    </div>
  );
}

Message.propTypes = {
  text: PropTypes.string.isRequired,
  sent: PropTypes.bool.isRequired
};

export default Message;
