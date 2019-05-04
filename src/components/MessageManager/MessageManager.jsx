import React, { Component } from "react";
import "./MessageManager.css";
import MessagingWindow from "../MessagingWindow/MessagingWindow";

import Firebase from "firebase";

class MessageManager extends Component {
  constructor(props) {
    super(props);

    this.state = {
      friends: [],
      friendClicked: {},
    };
  }

  componentDidMount() {
    this.friendsRef = Firebase.database().ref(
      "users/" + this.props.user + "/friends/"
    ); //reference to friends
    this.friendsRef.on("value", snapshot => {
      this.setState(
        {
          friends: snapshot.val() //gives complete list of friends
        },
        () => {
          let newFriendClicked = {};
          Object.keys(this.state.friends).map(
            (friend) => (newFriendClicked[friend] = false)
          );
          this.setState({
            friendClicked: newFriendClicked //initializes every friend's "clicked" property to false
          });
        }
      );
    });
  }

  handleFriendClick = friend => {
    let prevFriendClicked = this.state.friendClicked;
    prevFriendClicked[friend] = !this.state.friendClicked[friend];
    this.setState({ friendClicked: prevFriendClicked }); //inverts "clicked" property for given friend
  };

  render() {
    return (
      <div>
        <h1>Temporary Message Manager</h1>

        {/* Display list of friends */}
        {Object.keys(this.state.friends).map((friend, index) => (
          <div key={index}>
            <button
              className="friend-name"
              onClick={() => this.handleFriendClick(friend)}
            >
              
              Friend {friend}  
            </button>
            <div
              style={{
                display: this.state.friendClicked[friend] ? "inline" : "none"
              }}
            >
              <MessagingWindow user={this.props.user} receiver={friend} />
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default MessageManager;
