import React, { Component } from "react";
import "./MessageManager.css";
import PropTypes from "prop-types";
import MessagingWindow from "../MessagingWindow/index";
import firebaseWrapper from "../../firebaseWrapper";

class MessageManager extends Component {
  constructor(props) {
    super(props);

    this.state = {
      friends: {},
      activeConversation: null
    };
  }

  componentDidMount() {
    const { user } = this.props;
    const getFriends = friends => {
      this.setState({
        friends
      });
    };
    firebaseWrapper.fetchFriends(user, getFriends);
  }

  handleFriendClick = friend => {
    this.setState({
      activeConversation: friend
    });
  };

  render() {
    const { friends, activeConversation } = this.state;
    const { user } = this.props;
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
            userId={user}
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
  user: PropTypes.string.isRequired
};

export default MessageManager;
