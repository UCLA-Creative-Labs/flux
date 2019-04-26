import React, {Component} from "react";
import "./MessagingWindow.css"; 

import Firebase from "firebase";

class MessagingWindow extends Component {
  constructor() {
    super();
    tempRef= Firebase.database().ref("users/"+this.props.user+"/friends/"+this.props.receiver);
    this.tempRef.on("value", snapshot => {
        this.conversationRef = Firebase.database().ref("conversations/"+snapshot.val());
      });

    this.state = {
      messages: {},
      user: this.props.user,
      receiver: this.props.receiver
    };
  }

  componentDidMount() {
    this.conversationRef.on("value", snapshot => {
      this.setState({
        messages: snapshot.val()
      });
    });
  }


  render() {

    return (
      <div>
        <h1>Empty Messaging Window</h1>
        {/* TODO: Display all messages in from state, left indented if received, right indented if sent (To be changed later!)*/}
        {/* TODO: Have a simple form with one text field and one submit button to send a message */}
      </div>
    );
  }
}

export default MessagingWindow;

