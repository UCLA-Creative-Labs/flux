import React, { Component } from "react";
import PropTypes from "prop-types";
import "./MessagingWindow.css";
import firebaseWrapper from "../../firebaseWrapper";
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
    const done = messages => {
      this.setState({
        messages
      });
    };
    firebaseWrapper.listenForMessages("asdf", done);
  }

  handleChange = e => {
    this.setState({ text: e.target.value });
  };

  handleClick = e => {
    e.preventDefault();

    const { text, user } = this.state;
    const message = { text, user_id: user };
    firebaseWrapper.sendMessage("asdf", user, message);
    this.setState({
      text: ""
    });
  };

  render() {
    const { text, messages, user } = this.state;
    return (
      <div>
        <h1>Temporary Messaging Window</h1>

        {/* Display all messages from state, white bg if received, blue bg if sent (To be changed later!) */}
        {Object.keys(messages).map(messageId =>
          messages[messageId].user_id === user ? (
            <Message key={messageId} text={messages[messageId].text} sent />
          ) : (
            <Message
              key={messageId}
              text={messages[messageId].text}
              sent={false}
            />
          )
        )}

        {/* A Simple form with one text field and one submit button to send a message */}
        <form>
          <input type="text" onChange={this.handleChange} value={text} />
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