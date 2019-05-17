import React, { Component } from "react";
import PropTypes from "prop-types";
import FriendsList from "./FriendsList";
import NewsFeed from "../NewsFeed";
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
    const {
      userId,
      match: {
        params: { profileId }
      }
    } = this.props;

    firebaseWrapper.addFriend(userId, profileId);
  };

  render() {
    const {
      userId,
      match: {
        params: { profileId }
      }
    } = this.props;
    const { friends } = this.state;

    return (
      <div>
        <div>Profile Picture here</div>
        <h1>{profileId}</h1>
        {profileId !== userId && !(userId in friends) ? (
          <button type="button" onClick={this.addFriend}>
            Add Friend
          </button>
        ) : (
          <div />
        )}
        <FriendsList friends={friends} />

        <div>
          <h2>User Posts</h2>
          <NewsFeed userId={userId} profileId={profileId} type="user" />
        </div>

        <div>
          <h2>Liked Posts</h2>
          <NewsFeed userId={userId} profileId={profileId} type="liked" />
        </div>
      </div>
    );
  }
}

ProfilePage.propTypes = {
  match: PropTypes.shape({}).isRequired,
  userId: PropTypes.string.isRequired
};

export default ProfilePage;
