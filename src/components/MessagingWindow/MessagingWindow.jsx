import React, { Component } from "react";
import "./MessagingWindow.css";
import Message from "./Message";

import Firebase from "firebase";

class MessagingWindow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      user: this.props.user,
      receiver: this.props.receiver,
      text: "" //temporary local variable used to handle text from the "send-message" text field
    };
  }

  componentDidMount() {
    this.tempRef = Firebase.database().ref(
      "users/" + this.props.user + "/friends/" + this.props.receiver + "/"
    ); //temporary reference to extract conversation reference
    this.tempRef.on("value", snapshot1 => {
      Firebase.database()
        .ref("/conversations/" + snapshot1.val() + "/messages/")
        .on("value", snapshot2 => {
          this.setState({
            messages: snapshot2.val() //gives complete list of messages in given conversation node
          });
          console.log(this.state);
          this.conversationRef = Firebase.database().ref(
            "/conversations/" + snapshot1.val() + "/messages/"
          );
        });
    });
  }

  handleChange = e => {
    this.setState({ text: e.target.value });
  };

  handleClick = e => {
    e.preventDefault();

    const message = { text: this.state.text, user_id: this.state.user };
    this.conversationRef.push(message);
    this.setState({
      text: ""
    });
  };

  render() {
    return (
      <div>
        <h1>Temporary Messaging Window</h1>

        {/* Display all messages from state, white bg if received, blue bg if sent (To be changed later!)*/}
        {Object.keys(this.state.messages).map((m, i) =>
          this.state.messages[m].user_id === this.state.user ? (
            <Message key={i} text={this.state.messages[m].text} sent={true} />
          ) : (
            <Message key={i} text={this.state.messages[m].text} sent={false} />
          )
        )}

        {/* A Simple form with one text field and one submit button to send a message */}
        <form>
          <input
            type="text"
            onChange={this.handleChange}
            value={this.state.text}
          />
          <button onClick={this.handleClick} type="submit">
            Send!
          </button>
        </form>
      </div>
    );
  }
}

export default MessagingWindow;
