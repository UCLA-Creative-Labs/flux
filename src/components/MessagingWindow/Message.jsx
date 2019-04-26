import React, { Component } from "react";

class Message extends Component {
  constructor() {
    super();
  }

  render() {
    var styling = this.props.sent ? styles.sent : styles.received;
    return <div style={styling}>{this.props.text}</div>;
  }
}

var styles = {
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
