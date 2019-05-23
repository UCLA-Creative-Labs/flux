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
    let userPostsClass;
    let likedPostsClass;
    let friendsListClass;
    if (activeTab === "userPosts") {
      userPostsClass = "active";
      likedPostsClass = "hidden";
      friendsListClass = "hidden";
    } else if (activeTab === "likedPosts") {
      userPostsClass = "hidden";
      likedPostsClass = "active";
      friendsListClass = "hidden";
    } else if (activeTab === "friendsList") {
      userPostsClass = "hidden";
      likedPostsClass = "hidden";
      friendsListClass = "active";
    } else {
      userPostsClass = "preview";
      likedPostsClass = "preview";
      friendsListClass = "preview";
    }
    userPostsClass = userPostsClass.concat(" userPosts");
    likedPostsClass = likedPostsClass.concat(" likedPosts");
    friendsListClass = friendsListClass.concat(" friendsList");
    return (
      <div className="profilePage">
        <div>
          <button type="submit" onClick={handleLogout}>
            Logout
          </button>
        </div>
        <div className="userInfo">
          <img src={profilePicture} className="profilePicture" />
            <div>
                <h2 className="profileId">{profileId}</h2>
                {profileId !== userId && !(userId in friends) && (
                <button type="button" onClick={this.addFriend}>
                Add Friend
                </button>
                )}
            </div>
        </div>

        <div>
          <div
            className={friendsListClass}
            onClick={() => this.toggleActiveTab("friendsList")}
            role="menuitem"
            tabIndex="0"
            onKeyDown={() => {}}
          >
            <FriendsList friends={friends} />
          </div>
          <div
            className={userPostsClass}
            onClick={() => this.toggleActiveTab("userPosts")}
            role="menuitem"
            tabIndex="-1"
            onKeyDown={() => {}}
          >
            <h2>User Posts</h2>
            <NewsFeed userId={userId} profileId={profileId} type="user" />
          </div>

          <div
            className={likedPostsClass}
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
