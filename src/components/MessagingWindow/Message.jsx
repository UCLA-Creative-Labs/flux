import React from "react";
import PropTypes from "prop-types";
import "../../colors.css";

const rb = require("../../images/ReceivedBubble.svg");
const sb = require("../../images/SentBubble.svg");

function Message({ text, sent }) {
  const s = parseInt(Math.sqrt(text.length)) * 30;
  const styles = {
    sent: {
      backgroundImage: `url(${sb})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      width: `${s}px`,
      height: `${s}px`
    },
    received: {
      backgroundImage: `url(${rb})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      width: `${s}px`,
      height: `${s}px`
    }
  };

  const styling = sent ? styles.sent : styles.received;
  return (
    <div style={styling} className="message">
      <p className="text-wrapper">{text}</p>
    </div>
  );
}

Message.propTypes = {
  text: PropTypes.string.isRequired,
  sent: PropTypes.bool.isRequired
};

export default Message;
