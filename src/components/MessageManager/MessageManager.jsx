import React, { Component } from "react";
import "./MessageManager.css";
import MessagingWindow from "../MessagingWindow/MessagingWindow";

import Firebase from "firebase";

class MessageManager extends Component {
  constructor(props) {
    super(props);

    this.state = {
      friends: [],
      user: this.props.user
    };
  }

  componentDidMount() {
    this.friendsRef = Firebase.database().ref(
        "users/" + this.props.user + "/friends/" 
      ); //reference to friends
      this.friendsRef.on("value", snapshot => {
        this.setState({
            friends: snapshot.val() //gives complete list of friends with conversation ids
          });
      });
  }

  render() {
    return (
      <div>
        <h1>Temporary Message Manager</h1>

        {/* TODO: Display list of friends */}
        {console.log(this.state)}
      </div>
    );
  }
}

export default MessageManager;
