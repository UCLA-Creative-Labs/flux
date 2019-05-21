import React, { Component } from "react";
import PropTypes from "prop-types";
import firebaseWrapper from "../../firebaseWrapper";
import "./styles.css";

class MessageTile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lastMessage: "",
      user: {}
    };
  }

  componentDidMount() {
    // //Fetch user data!
    // const updateMessages = (messages, prevRef) => {
    //   this.setState({
    //     messages,
    //     prevConversationRef: prevRef
    //   });
    // };
    // firebaseWrapper.listenForMessages(
    //   //Listen for new message!
    //   prevConversationRef,
    //   conversationId,
    //   updateMessages
    // );
  }

  render() {
    return (
      <div className="tile-wrapper">
        <div className="profile-picture">
          <img />
          Insert Image Here Insert Image Here Insert Image Here Insert Image
          Here
        </div>
        <div className="user-content">
          <div className="user-name">User</div>
          <div className="message">Last Message</div>
        </div>
      </div>
    );
  }
}

MessageTile.propTypes = {
  userId: PropTypes.string.isRequired
};

export default MessageTile;
