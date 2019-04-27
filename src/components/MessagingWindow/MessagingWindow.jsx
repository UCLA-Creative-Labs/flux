import React, { Component } from "react";
import "./MessagingWindow.css";
import Firebase from "firebase";
import PropTypes from "prop-types";
import Message from "./Message";

class MessagingWindow extends Component {
  constructor(props) {
    super(props);

    const { user, receiver } = this.props;
    this.state = {
      messages: [],
      user,
      receiver,
      text: "" // temporary local variable used to handle text from the "send-message" text field
    };
  }

  componentDidMount() {
    const { user, receiver } = this.state;
    this.tempRef = Firebase.database().ref(
      `users/${user}/friends/${receiver}/`
    ); // temporary reference to extract conversation reference
    this.tempRef.on("value", snapshot1 => {
      Firebase.database()
        .ref(`/conversations/${snapshot1.val()}/messages/`)
        .on("value", snapshot2 => {
          this.setState({
            messages: snapshot2.val() // gives complete list of messages in given conversation node
          });
          this.conversationRef = Firebase.database().ref(
            `/conversations/${snapshot1.val()}/messages/`
          );
        });
    });
  }

  handleChange = e => {
    this.setState({ text: e.target.value });
  };

  handleClick = e => {
    e.preventDefault();

    const { text, user } = this.state;
    const message = { text, user_id: user };
    this.conversationRef.push(message);
    this.setState({
      text: ""
    });
  };

  render() {
    const { text: val, messages, user } = this.state;
    return (
      <div>
        <h1>Temporary Messaging Window</h1>

        {/* Display all messages from state, white bg if received, blue bg if sent (To be changed later!) */}
        {Object.keys(messages).map(m =>
          messages[m].user_id === user ? (
            <Message key={m} text={messages[m].text} sent />
          ) : (
            <Message key={m} text={messages[m].text} sent={false} />
          )
        )}

        {/* A Simple form with one text field and one submit button to send a message */}
        <form>
          <input type="text" onChange={this.handleChange} value={val} />
          <button onClick={this.handleClick} type="submit">
            Send!
          </button>
        </form>
      </div>
    );
  }
}

MessagingWindow.propTypes = {
  user: PropTypes.string.isRequired,
  receiver: PropTypes.string.isRequired
};

export default MessagingWindow;
