import React, { Component } from "react";
import PropTypes from "prop-types";
import firebaseWrapper from "../../firebaseWrapper";
import MessagingWindow from "../MessagingWindow/index";
import "./styles.css";
import MessageTile from "../MessageTile";

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
    const { friendsRef } = this.state;

    if (friendsRef === undefined) {
      const updateFriends = (friends, newFriendsRef) => {
        this.setState({
          friends,
          friendsRef: newFriendsRef,
          activeConversation: Object.keys(friends)[0]
        });
      };
      firebaseWrapper.listenForFriends(userId, updateFriends);
    }
  }

  componentWillReceiveProps(props) {
    const { userId } = props;
    const { friendsRef } = this.state;

    if (friendsRef === undefined) {
      const updateFriends = (friends, newFriendsRef) => {
        this.setState({
          friends,
          friendsRef: newFriendsRef
        });
      };
      firebaseWrapper.listenForFriends(userId, updateFriends);
    }
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
      <div className="window-wrapper">
        {/* <div className="topBar"><p> Direct Messages</p></div> */}
        <div className="conversationList">
          {Object.keys(friends).map(friendId => (
            <div
              key={friendId}
              onClick={() => this.handleFriendClick(friendId)}
            >
              <MessageTile
                userId={friendId}
                isSelected={activeConversation === friendId}
              />
            </div>
          ))}
        </div>

        <div className="conversationWindow">
          {activeConversation != null && (
            <MessagingWindow
              userId={userId}
              conversationId={friends[activeConversation]}
            />
          )}
        </div>
      </div>
    );
  }
}

MessageManager.propTypes = {
  userId: PropTypes.string.isRequired
};

export default MessageManager;
