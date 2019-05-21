import React, { Component } from "react";
import PropTypes from "prop-types";
import FriendsList from "./FriendsList";
import NewsFeed from "../NewsFeed";
import firebaseWrapper from "../../firebaseWrapper";
import "./styles.css";

class ProfilePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      //   likedPosts: [],
      //   userPosts: [],
      friends: {},
      activeTab: ""
    };
  }

  componentDidMount() {
    const { match } = this.props;
    const { params } = match;
    const { profileId } = params;

    const updateProfilePicture = profilePicture => {
      this.setState({
        profilePicture
      });
    };
    const updateFriends = friends => {
      this.setState({
        friends
      });
    };

    firebaseWrapper.getProfilePicture(profileId, updateProfilePicture);
    firebaseWrapper.listenForFriends(profileId, updateFriends);
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

  toggleActiveTab = activeTab => {
    this.setState({
      activeTab
    });
  };

  render() {
    const {
      userId,
      handleLogout,
      match: {
        params: { profileId }
      }
    } = this.props;
    const { friends, profilePicture, activeTab } = this.state;
    let userPosts = "preview";
    let likedPosts = "preview";
    if (activeTab === "userPosts") {
      userPosts = "active";
      likedPosts = "hidden";
    } else if (activeTab === "likedPosts") {
      userPosts = "hidden";
      likedPosts = "active";
    }
    userPosts = userPosts.concat(" userPosts");
    likedPosts = likedPosts.concat(" likedPosts");
    return (
      <div className="profilePage">
        <div>
          <button type="submit" onClick={handleLogout}>
            Logout
          </button>
        </div>
        <div className="userInfo">
          <img src={profilePicture} alt="Profile" className="profilePicture" />

          <h1>{profileId}</h1>
          {profileId !== userId && !(userId in friends) ? (
            <button type="button" onClick={this.addFriend}>
              Add Friend
            </button>
          ) : (
            <div />
          )}
          <FriendsList friends={friends} />
        </div>

        <div>
          <div
            className={userPosts}
            onClick={() => this.toggleActiveTab("userPosts")}
            role="menuitem"
            tabIndex="0"
            onKeyDown={() => {}}
          >
            <h2>User Posts</h2>
            <NewsFeed userId={userId} profileId={profileId} type="user" />
          </div>

          <div
            className={likedPosts}
            onClick={() => this.toggleActiveTab("likedPosts")}
            role="menuitem"
            tabIndex="-1"
            onKeyDown={() => {}}
          >
            <h2>Liked Posts</h2>
            <NewsFeed userId={userId} profileId={profileId} type="liked" />
          </div>
        </div>
      </div>
    );
  }
}

ProfilePage.propTypes = {
  match: PropTypes.shape({}).isRequired,
  userId: PropTypes.string.isRequired,
  handleLogout: PropTypes.func.isRequired
};

export default ProfilePage;
