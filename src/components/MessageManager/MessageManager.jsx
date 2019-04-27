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
      user: this.props.user
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
          let newClickedList = {};
          Object.keys(this.state.friends).map(
            (f, i) => (newClickedList[f] = false)
          );
          this.setState({
            friendClicked: newClickedList
          });
        }
      );
    });
  }

  handleFriendClick = f => {
    let prevFriendClicked = this.state.friendClicked;
    prevFriendClicked[f] = !this.state.friendClicked[f];
    this.setState({ friendClicked: prevFriendClicked });
  };

  render() {
    return (
      <div>
        <h1>Temporary Message Manager</h1>

        {/* TODO: Display list of friends */}
        {console.log(this.state)}
        {Object.keys(this.state.friends).map((f, i) => (
          <div key={i}>
            <button
              className="friend-name"
              onClick={() => this.handleFriendClick(f)}
            >
              {" "}
              Friend {f}{" "}
            </button>
            <div
              style={{
                display: +this.state.friendClicked[f] ? "inline" : "none"
              }}
            >
              <MessagingWindow user={this.state.user} receiver={f} />
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default MessageManager;
