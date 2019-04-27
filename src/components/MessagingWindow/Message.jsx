import React from "react";

function Message({ text, sent }) {
    var styling = sent ? styles.sent : styles.received;
    return (
        <div style={styling}>{text}</div>
    );
  }

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

export default Message;
