import React from "react";
import PropTypes from "prop-types";
import "../../colors.css";

const styles = {
  sent: {
    display: "inline-block",
    boxSizing: "border-box",
    height: "auto",
    width: "auto",
    //borderRadius: "50%",
    // backgroundColor: "var(--light-teal)"
    backgroundImage: "url(" + require("../../images/SentBubble.svg") + ")",
    backgroundRepeat: "no-repeat"
  },
  received: {
    display: "inline-block",
    boxSizing: "border-box",
    height: "auto",
    width: "auto",
    //borderRadius: "50%",
    // backgroundColor: "var(--blueberry)"
    backgroundImage: "url(" + require("../../images/ReceivedBubble.svg") + ")",
    backgroundRepeat: "no-repeat"
  }
};

function Message({ text, sent }) {
  const styling = sent ? styles.sent : styles.received;
  const bgsource = sent
    ? "../../../images/SentBubble.svg"
    : "../../../images/ReceivedBubble.svg";
  return (
    <div style={styling}>
      <p style={{ textAlign: "center" }}>{text}</p>
    </div>
  );
}

Message.propTypes = {
  text: PropTypes.string.isRequired,
  sent: PropTypes.bool.isRequired
};

export default Message;
