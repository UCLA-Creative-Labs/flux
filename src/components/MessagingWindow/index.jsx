import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "../../colors.css";
import firebaseWrapper from "../../firebaseWrapper";
import Message from "./Message";
import "./styles.css";
import blower from "../../images/Bubbleblower.svg";

class MessagingWindow extends Component {
  constructor(props) {
    super(props);
    const { friendId } = this.props;
    this.state = {
      messages: [],
      friendId,
      firstName: "",
      lastName: "",
      text: "",
      photoURL: "",
      w: 0,
      t: null
    };

    this.textInput = React.createRef();
  }

  componentDidMount() {
    const { conversationId } = this.props;
    const { friendId, prevConversationRef } = this.state;

    const updateMessages = (messages, prevRef) => {
      this.setState({
        messages,
        prevConversationRef: prevRef
      });
    };

    const updateName = (firstName, lastName) => {
      this.setState({
        firstName,
        lastName
      });
    };

    const updatePicture = picurl => {
      this.setState({
        photoURL: picurl
      });
    };

    firebaseWrapper.listenForMessages(
      prevConversationRef,
      conversationId,
      updateMessages
    );

    firebaseWrapper.getName(friendId, updateName);
    firebaseWrapper.getProfilePicture(friendId, updatePicture);
  }

  componentWillReceiveProps(nextProps) {
    const { friendId, conversationId } = nextProps;
    const { prevConversationRef } = this.state;

    const updateMessages = (messages, prevRef) => {
      this.setState({
        friendId,
        messages,
        prevConversationRef: prevRef
      });
    };

    const updatePicture = picurl => {
      this.setState({
        photoURL: picurl
      });
    };

    const updateName = (firstName, lastName) => {
      this.setState({
        firstName,
        lastName
      });
    };

    firebaseWrapper.listenForMessages(
      prevConversationRef,
      conversationId,
      updateMessages
    );

    firebaseWrapper.getName(friendId, updateName);
    firebaseWrapper.getProfilePicture(friendId, updatePicture);
  }

  handleChange = e => {
    this.setState({ text: e.target.value });
  };

  handleClick = e => {
    e.preventDefault();
    clearInterval(this.timer);
    const { text } = this.state;
    const { userId, conversationId, makeNotification } = this.props;
    const message = { text, userId };
    makeNotification("message", userId);
    firebaseWrapper.sendMessage(conversationId, message);
    this.setState({
      text: "",
      w: 0
    });
  };

  startTimer = () => {
    this.textInput.current.focus();

    this.ti = setInterval(() => {
      this.setState(state => {
        return { w: state.w + 1 };
      }, this.textInput.current.focus());
    }, 15);

    this.setState({ t: this.ti });
  };

  stopTimer = () => {
    const { t } = this.state;
    clearInterval(t);
    clearInterval(this.ti);
  };

  render() {
    const { firstName, lastName, photoURL, w, text, messages } = this.state;
    const { conversationId, friendId, userId } = this.props;
    const climit = w / 12;
    const barWidth = w;

    return (
      <div className="wrapper" onDragEnd={this.stopTimer}>
        <div className="friend-info">
          <Link to={`/user/${friendId}`} className="name">
            <p>
              {firstName} {lastName}
            </p>
          </Link>
          <div className="pictureWrapper">
            <div className="friend-picture">
              <img src={photoURL} alt="profile-pic" />
            </div>
          </div>
        </div>
        <div className="messages">
          {Object.keys(messages).map(messageId =>
            messages[messageId].userId === userId ? (
              <Message
                key={messageId}
                text={messages[messageId].text}
                sent
                id={messageId}
                cid={conversationId}
              />
            ) : (
              <Message
                key={messageId}
                text={messages[messageId].text}
                sent={false}
                id={messageId}
                cid={conversationId}
              />
            )
          )}
        </div>

        <div className="input-bar" onMouseUp={this.stopTimer}>
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
              onMouseDown={this.startTimer}
              onMouseUp={this.stopTimer}
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
              ref={this.textInput}
              type="text"
              maxLength={climit}
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
                width: `${barWidth}px`,
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
  friendId: PropTypes.string.isRequired,
  conversationId: PropTypes.string.isRequired,
  makeNotification: PropTypes.func.isRequired
};

export default MessagingWindow;
