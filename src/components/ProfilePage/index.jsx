import React, { Component } from "react";
import PropTypes from "prop-types";
import FriendsList from "./FriendsList";
import NewsFeed from "../NewsFeed";
import firebaseWrapper from "../../firebaseWrapper";
import "./styles.css";

const Curve = ({
  onClick1,
  className1,
  onClick2,
  className2,
  activeTabAbove
}) => {
  let topPathClass = className1;
  if (activeTabAbove) topPathClass = "hidden";
  return (
    <svg className="svg" width="1400" height="78.867516">
      <path
        className={topPathClass}
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
};

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
    let userPostsPath;
    let likedPostsPath;
    let friendsListPath;
    if (activeTab === "userPosts") {
      userPostsClass = "active";
      userPostsPath = "active";
      likedPostsClass = "hidden";
      likedPostsPath = "hidden";
      friendsListClass = "hidden";
      friendsListPath = "hidden";
    } else if (activeTab === "likedPosts") {
      userPostsClass = "hidden";
      userPostsPath = "hidden";
      likedPostsClass = "active";
      likedPostsPath = "active";
      friendsListClass = "hidden";
      friendsListPath = "hidden";
    } else if (activeTab === "friendsList") {
      userPostsClass = "hidden";
      userPostsPath = "hidden";
      likedPostsClass = "hidden";
      likedPostsPath = "hidden";
      friendsListClass = "active";
      friendsListPath = "active";
    } else {
      userPostsClass = "preview";
      userPostsPath = "active";
      likedPostsClass = "preview";
      likedPostsPath = "active";
      friendsListClass = "preview";
      friendsListPath = "active";
    }
    userPostsClass = userPostsClass.concat(" userPosts");
    userPostsPath = userPostsPath.concat(" userPostsPath");
    likedPostsClass = likedPostsClass.concat(" likedPosts");
    likedPostsPath = likedPostsPath.concat(" likedPostsPath");
    friendsListClass = friendsListClass.concat(" friendsList");
    friendsListPath = friendsListPath.concat(" friendsListPath");
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
              className2={friendsListPath}
              activeTabAbove={false}
            />
          </div>

          <div
            className={friendsListClass}
            onClick={() => this.toggleActiveTab("friendsList")}
            role="menuitem"
            tabIndex="-1"
            onKeyDown={() => {}}
          >
            <FriendsList friends={friends} />
          </div>

          <div className="curve">
            {activeTab === "friendsList" ? (
              <Curve
                onClick1={() => this.toggleActiveTab("friendsList")}
                className1={friendsListPath}
                onClick2={() => this.toggleActiveTab("userPosts")}
                className2={userPostsPath}
                activeTabAbove
              />
            ) : (
              <Curve
                onClick1={() => this.toggleActiveTab("friendsList")}
                className1={friendsListPath}
                onClick2={() => this.toggleActiveTab("userPosts")}
                className2={userPostsPath}
                activeTabAbove={false}
              />
            )}
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
            {activeTab === "userPosts" ? (
              <Curve
                onClick1={() => this.toggleActiveTab("userPosts")}
                className1={userPostsPath}
                onClick2={() => this.toggleActiveTab("likedPosts")}
                className2={likedPostsPath}
                activeTabAbove
              />
            ) : (
              <Curve
                onClick1={() => this.toggleActiveTab("userPosts")}
                className1={userPostsPath}
                onClick2={() => this.toggleActiveTab("likedPosts")}
                className2={likedPostsPath}
                activeTabAbove={false}
              />
            )}
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
  className2: PropTypes.string.isRequired,
  activeTabAbove: PropTypes.bool.isRequired
};

export default ProfilePage;
