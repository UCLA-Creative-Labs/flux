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
        friends: snapshot.val() //gives complete list of friends
      });
    });
  }
  

  render() {
    return (
      <div>
        <h1>Temporary Message Manager</h1>

        {/* TODO: Display list of friends */}
        {console.log(this.state)}
        {Object.keys(this.state.friends).map((f, i) =>
            <div key={i}>
                <p onClick= {this.handleFriendClick}>{f}</p>
                <MessagingWindow user={this.state.user} receiver={f} />
            </div>
        )}
      </div>
    );
  }
}

export default MessageManager;
