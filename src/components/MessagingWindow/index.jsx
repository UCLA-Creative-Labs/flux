import React, { Component } from "react";
import PropTypes from "prop-types";
import "../../colors.css";
import firebaseWrapper from "../../firebaseWrapper";
import Message from "./Message";
import "./styles.css";
import blower from "../../images/Bubbleblower.svg";

class MessagingWindow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      text: ""
    };
  }

  componentDidMount() {
    const { conversationId } = this.props;
    const { prevConversationRef } = this.state;

    const updateMessages = (messages, prevRef) => {
      this.setState({
        messages,
        prevConversationRef: prevRef
      });
    };

    firebaseWrapper.listenForMessages(
      prevConversationRef,
      conversationId,
      updateMessages
    );
  }

  componentWillReceiveProps(nextProps) {
    const { conversationId } = nextProps;
    const { prevConversationRef } = this.state;

    const updateMessages = (messages, prevRef) => {
      this.setState({
        messages,
        prevConversationRef: prevRef
      });
    };

    firebaseWrapper.listenForMessages(
      prevConversationRef,
      conversationId,
      updateMessages
    );
  }

  handleChange = e => {
    this.setState({ text: e.target.value });
  };

  handleClick = e => {
    e.preventDefault();

    const { text } = this.state;
    const { userId, conversationId } = this.props;
    const message = { text, userId };
    firebaseWrapper.sendMessage(conversationId, message);
    this.setState({
      text: ""
    });
  };

  render() {
    const { text, messages } = this.state;
    const { userId } = this.props;

    return (
      <div className="wrapper">
        <div className="friend-info">
          {/* <h1>{conversationId}</h1> replace this with the user photo */}
        </div>

        <div className="messages">
          {/* Display all messages */}
          {Object.keys(messages).map(messageId =>
            messages[messageId].userId === userId ? (
              <Message key={messageId} text={messages[messageId].text} sent />
            ) : (
              <Message
                key={messageId}
                text={messages[messageId].text}
                sent={false}
              />
            )
          )}
        </div>

        <div className="input-bar">
          {/* A Simple form with one text field and one submit button to send a message */}
          <form
            onSubmit={this.handleClick}
            style={{
              alignContent: "center",
              height: "45px",
              paddingTop: "7.5px",
              borderTop: "5px solid var(--gray)"
            }}
          >
            <div
              onClick={this.handleClick}
              type="submit"
              style={{
                display: "inline-block",
                width: "25px",
                height: "67%",
                float: "right"
              }}
            >
              <img
                src={blower}
                style={{
                  width: "25px",
                  height: "67%",
                  float: "right",
                  marginRight: "15px",
                  paddingTop: "3px"
                }}
                alt="send-button"
              />
            </div>
            <input
              type="text"
              placeholder="TYPE A MESSAGE!"
              onChange={this.handleChange}
              value={text}
              style={{
                display: "inline-block",
                borderRadius: "15px",
                height: "67%",
                border: "none",
                backgroundColor: "var(--gray)",
                paddingLeft: "5px",
                marginRight: "20px",
                width: "auto",
                maxWidth: "90%",
                float: "right",
                outline: "none"
              }}
            />
          </form>
        </div>
      </div>
    );
  }
}

MessagingWindow.propTypes = {
  userId: PropTypes.string.isRequired,
  conversationId: PropTypes.string.isRequired
};

export default MessagingWindow;
