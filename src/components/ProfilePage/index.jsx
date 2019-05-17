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
    firebaseWrapper.getFriends(profileId, updateFriends);
  }

  addFriend = () => {
    const { match } = this.props;
    const { params } = match;
    const { profileId } = params;
    const { userId } = this.props;
    const addedNewFriend = friends => {
      this.setState({
        friends
      });
    };
    firebaseWrapper.addFriend(profileId, userId, addedNewFriend);
  };

  render() {
    const { userId } = this.props;
    const { match } = this.props;
    const { params } = match;
    const { profileId } = params;
    const { friends } = this.state;
    return (
      <div>
        <div>Profile Picture here</div>
        <h1>{profileId}</h1>
        {profileId !== userId ? (
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
  match: PropTypes.shape({}).isRequired,
  userId: PropTypes.string.isRequired
};

export default ProfilePage;
