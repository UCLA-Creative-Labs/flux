import React, { Component } from "react";
import "./MessageManager.css";
import MessagingWindow from "../MessagingWindow/MessagingWindow";

import Firebase from "firebase";

class MessageManager extends Component {
  constructor(props) {
    super(props);

    this.state = {
      friends: [],
      user: this.props.user
    };
  }

  componentDidMount() {

  }


  render() {
    return (
      <div>
        <h1>Temporary Message Manager</h1>

        {/* TODO: Display list of friends */}

      </div>
    );
  }
}

export default MessageManager;
