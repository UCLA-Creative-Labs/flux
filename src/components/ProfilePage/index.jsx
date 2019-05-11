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
    const { match } = this.props;
    const { params } = match;
    const { profileId } = params;
    const currentUserId = "31415";
    const addedNewFriend = friends => {
      this.setState({
        friends
      });
    };
    const newFriendData = {};
    newFriendData[currentUserId] = "random";
    firebaseWrapper.addFriend(profileId, newFriendData, addedNewFriend);
  };

  render() {
    const currentUserId = "31415";
    const { match } = this.props;
    const { params } = match;
    const { profileId } = params;
    const { friends } = this.state;
    return (
      <div>
        <div>Profile Picture here</div>
        <h1>{profileId}</h1>
        {profileId !== currentUserId ? (
          <button type="button" onClick={this.addFriend}>
            Add Friend
          </button>
        ) : (
          <div />
        )}
        <FriendsList friends={friends} />
      </div>
    );
  }
}

ProfilePage.propTypes = {
  match: PropTypes.shape({}).isRequired
};

export default ProfilePage;
