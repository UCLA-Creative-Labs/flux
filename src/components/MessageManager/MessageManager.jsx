import React, { Component } from "react";
import "./MessageManager.css";
import Firebase from "firebase";
import PropTypes from "prop-types";
import MessagingWindow from "../MessagingWindow/index";

class MessageManager extends Component {
  constructor(props) {
    super(props);

    this.state = {
      friends: [],
      friendClicked: {}
    };
  }

  componentDidMount() {
    const { user } = this.props;
    this.friendsRef = Firebase.database().ref(`users/ ${user}  /friends/`); // reference to friends
    this.friendsRef.on("value", snapshot => {
      this.setState(
        {
          friends: snapshot.val() // gives complete list of friends
        },
        () => {
          const newFriendClicked = {};
          const { friends } = this.state;
          Object.keys(friends).forEach(friend => {
            newFriendClicked[friend] = false;
          });
          this.setState({
            friendClicked: newFriendClicked // initializes every friend's "clicked" property to false
          });
        }
      );
    });
  }

  handleFriendClick = friend => {
    this.setState(prevState => {
      const prevFriendClicked = prevState.friendClicked;
      prevFriendClicked[friend] = !prevFriendClicked[friend];
      return { friendClicked: prevFriendClicked };
    }); // inverts "clicked" property for given friend
  };

  render() {
    const { friends, friendClicked } = this.state;
    const { user } = this.props;
    return (
      <div>
        <h1>Temporary Message Manager</h1>
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
            <div
              style={{
                display: friendClicked[friendId] ? "inline" : "none"
              }}
            >
              <MessagingWindow user={user} receiver={friendId} />
            </div>
          </div>
        ))}
      </div>
    );
  }
}

MessageManager.propTypes = {
  user: PropTypes.string.isRequired
};

export default MessageManager;
