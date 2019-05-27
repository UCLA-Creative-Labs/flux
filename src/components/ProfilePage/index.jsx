import React, { Component } from "react";
import PropTypes from "prop-types";
import FriendsList from "./FriendsList";
import NewsFeed from "../NewsFeed";
import firebaseWrapper from "../../firebaseWrapper";
import "./styles.css";

const Curve = ({ onClick1, className1, onClick2, className2 }) => (
  <svg className="svg" width="1400" height="78.867516">
    <path
      className={className1}
      ref={ref => {
        if (ref) ref.addEventListener("click", onClick1);
      }}
      d="M 0 0 L 0 28.867188 C 394.53125 107.77344 757.93205 -0.1059539 1114.7656 0 L 0 0 z M 1114.7656 0 C 1210.1568 0.02832431 1305.0781 7.7734375 1400 28.867188 L 1400 0 L 1114.7656 0 z "
    />
    <path
      className={className2}
      ref={ref => {
        if (ref) ref.addEventListener("click", onClick2);
      }}
      d="m 0,78.867513 v -50 c 500,99.999997 950,-100 1400,0 v 50 z"
    />
  </svg>
);

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
          <img src={profilePicture} alt="" className="profilePicture" />
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
          <div className="curve">
            <Curve
              onClick1={() => {}}
              className1="hidden"
              onClick2={() => this.toggleActiveTab("friendsList")}
              className2="friendsListPath"
            />
          </div>

          <div
            className={friendsListClass}
            onClick={() => this.toggleActiveTab("friendsList")}
            role="menuitem"
            tabIndex="0"
            onKeyDown={() => {}}
          >
            <FriendsList friends={friends} />
          </div>

          <div className="curve">
            <Curve
              onClick1={() => this.toggleActiveTab("friendsList")}
              className1="friendsListPath"
              onClick2={() => this.toggleActiveTab("userPosts")}
              className2="userPostsPath"
            />
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

          <div className="curve">
            <Curve
              onClick1={() => this.toggleActiveTab("userPosts")}
              className1="userPostsPath"
              onClick2={() => this.toggleActiveTab("likedPostsPath")}
              className2="likedPostsPath"
            />
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

Curve.propTypes = {
  onClick1: PropTypes.func.isRequired,
  className1: PropTypes.string.isRequired,
  onClick2: PropTypes.func.isRequired,
  className2: PropTypes.string.isRequired
};

export default ProfilePage;
