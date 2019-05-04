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
    const { match } = this.props;
    const { params } = match;
    const { profileId } = params;
    const updateFriends = friends => {
      this.setState({
        friends
      });
    };
    firebaseWrapper.getAllFriends(profileId, updateFriends);
  }

  addFriend = () => {
<<<<<<< e407210fc8dcf0cf2f53e25287d4dc2a6c308299
    const { match } = this.props;
    const { params } = match;
    const { profileId } = params;
    const { userId } = this.props;
    const addedNewFriend = friends => {
      this.setState({
        friends
      });
    };
    const newFriendData = {};
    newFriendData[userId] = "random";
    firebaseWrapper.addFriend(profileId, newFriendData, addedNewFriend);
  };

  render() {
    const { userId } = this.props;
    const { match } = this.props;
    const { params } = match;
    const { profileId } = params;
=======
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
>>>>>>> add new friend functionality implemented
    const { friends } = this.state;
    return (
      <div>
        <div>Profile Picture here</div>
        <h1>{profileId}</h1>
<<<<<<< e407210fc8dcf0cf2f53e25287d4dc2a6c308299
        {profileId !== userId ? (
          <button type="button" onClick={this.addFriend}>
            Add Friend
          </button>
        ) : (
          <div />
        )}
=======
        {profileId !== currentUserId ? <button onClick={this.addFriend}>Add Friend</button> : <div/>}
>>>>>>> add new friend functionality implemented
        <FriendsList friends={friends} />
      </div>
    );
  }
}

ProfilePage.propTypes = {
  match: PropTypes.shape({}).isRequired,
  userId: PropTypes.string.isRequired
};

export default ProfilePage;
