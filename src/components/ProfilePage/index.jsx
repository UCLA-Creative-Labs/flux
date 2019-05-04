import React, { Component } from "react";
import PropTypes from "prop-types";
import FriendsList from "./FriendsList";
import firebaseWrapper from "../../firebaseWrapper";

class ProfilePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      //   likedPosts: [],
      //   userPosts: [],
      friends: {}
      //   activeTab: ""
    };
  }

  componentDidMount() {
    const { userId } = this.props;
    const updateFriends = friends => {
      this.setState({
        friends
      });
    };
    firebaseWrapper.getAllFriends(userId, updateFriends);
  }

  addFriend = () => {
      const { userId: profileId } = this.props;
      const currentUserId = "2468"; // this.props.match.params.userId;
      const addedNewFriend = friends => {
          this.setState({
              friends
          })
      }
      const newFriendData = {};
      newFriendData[currentUserId] = "random";
      firebaseWrapper.addFriend(profileId, newFriendData, addedNewFriend);
  }

  render() {
    const { userId: profileId } = this.props;
    const currentUserId = "2468" // this.props.match.params.userId;
    const { friends } = this.state;
    return (
      <div>
        <div>Profile Picture here</div>
        <h1>{profileId}</h1>
        {profileId !== currentUserId ? <button onClick={this.addFriend}>Add Friend</button> : <div/>}
        <FriendsList friends={friends} />
      </div>
    );
  }
}

ProfilePage.propTypes = {
  userId: PropTypes.string.isRequired
};

export default ProfilePage;
