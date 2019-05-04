import React, { Component } from "react";

class FriendsList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
      const { friends } = this.props;
      console.log(friends);
      return (<div>
          Friends:
          {Object.keys(friends).map((friendId) =>
            <div key={friendId}>{friendId}</div>
            )}
          </div>)
      ;
  }
}

export default FriendsList;
