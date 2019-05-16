import React, { Component } from "react";
import PropTypes from "prop-types";
import firebaseWrapper from "../../firebaseWrapper";
import MessagingWindow from "../MessagingWindow/index";
import "./MessageManager.css";

class MessageManager extends Component {
  constructor(props) {
    super(props);

    this.state = {
      friends: {},
      activeConversation: null
    };
  }

  componentDidMount() {
    const { userId } = this.props;
    const updateFriends = friends => {
      this.setState({
        friends
      });
    };
    firebaseWrapper.getFriends(userId, updateFriends);
  }

  handleFriendClick = friend => {
    this.setState({
      activeConversation: friend
    });
  };

  render() {
    const { friends, activeConversation } = this.state;
    const { userId } = this.props;
    return (
      <div>
        {/* <h1>Temporary Message Manager</h1> */}
        {/* Display list of friends */}
        {Object.keys(friends).map(friendId => (
          <div key={friendId}>
            <button
              className="friend-name"
              type="button"
              onClick={() => this.handleFriendClick(friendId)}
            >
              Friend {friendId}
            </button>
          </div>
        ))}
        {activeConversation != null ? (
          <MessagingWindow
            userId={userId}
            conversationId={friends[activeConversation]}
          />
        ) : (
          <p> Click a friend to get started! </p>
        )}
      </div>
    );
  }
}

MessageManager.propTypes = {
  userId: PropTypes.string.isRequired
};

export default MessageManager;
