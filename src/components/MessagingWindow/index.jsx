import React, { Component } from "react";
import PropTypes from "prop-types";
import "./MessagingWindow.css";
import firebaseWrapper from "../../firebaseWrapper";
import Message from "./Message";

class MessagingWindow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      text: "" // temporary local variable used to handle text from the "send-message" text field
    };
  }

  componentDidMount() {
    const { conversationId } = this.props;
    const updateMessages = messages => {
      this.setState({
        messages
      });
    };
    firebaseWrapper.listenForMessages(conversationId, updateMessages);
  }

  handleChange = e => {
    this.setState({ text: e.target.value });
  };

  handleClick = e => {
    e.preventDefault();

    const { text } = this.state;
    const { userId, conversationId } = this.props;
    const message = { text, user_id: userId };
    firebaseWrapper.sendMessage(conversationId, message);
    this.setState({
      text: ""
    });
  };

  render() {
    const { text, messages } = this.state;
    const { userId } = this.props;
    return (
      <div>
        <h1>Temporary Messaging Window</h1>

        {/* Display all messages from state, white bg if received, blue bg if sent (To be changed later!) */}
        {Object.keys(messages).map(messageId =>
          messages[messageId].user_id === userId ? (
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
  userId: PropTypes.string.isRequired,
  conversationId: PropTypes.string.isRequired
};

export default MessagingWindow;
