import React, { Component } from "react";
import PropTypes from "prop-types";
import FriendsList from "./FriendsList";
import NewsFeed from "../NewsFeed";
import firebaseWrapper from "../../firebaseWrapper";
import "./styles.css";

const Curve = ({
  onClickTop,
  classNameTop,
  onClickBottom,
  classNameBottom,
  isAboveTabActive
}) => {
  let topPathClass = classNameTop;
  if (isAboveTabActive) topPathClass = "hidden";
  return (
    <svg
      className="svg"
      width="100%"
      height="100%"
      viewBox="0 0 1400 78"
      preserveAspectRatio="xMinYMin slice"
    >
      <path
        className={topPathClass}
        ref={ref => {
          if (ref) ref.addEventListener("click", onClickTop);
        }}
        d="M 0 0 L 0 28.867188 C 394.53125 107.77344 757.93205 -0.1059539 1114.7656 0 L 0 0 z M 1114.7656 0 C 1210.1568 0.02832431 1305.0781 7.7734375 1400 28.867188 L 1400 0 L 1114.7656 0 z "
      />
      <path
        className={classNameBottom}
        ref={ref => {
          if (ref) ref.addEventListener("click", onClickBottom);
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
      friends: {},
      activeTab: "",
      firstName: "",
      lastName: ""
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
    const updateName = (firstName, lastName) => {
      this.setState({
        firstName,
        lastName
      });
    };

    firebaseWrapper.getProfilePicture(profileId, updateProfilePicture);
    firebaseWrapper.listenForFriends(profileId, updateFriends);
    firebaseWrapper.getName(profileId, updateName);
  }

  addFriend = () => {
    const {
      userId,
      match: {
        params: { profileId }
      },
      makeNotification
    } = this.props;
    makeNotification("addFriend", profileId);
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
    const { firstName, lastName } = this.state;

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
          <img src={profilePicture} alt="Profile" className="profilePicture" />
          <div>
            <h2 className="name">
              {firstName} {lastName}
            </h2>
            {profileId !== userId && !(userId in friends) && (
              <button type="button" onClick={this.addFriend}>
                Add Friend
              </button>
            )}
          </div>
        </div>

        <div className="posts">
          {(activeTab === "friendsList" || activeTab === "") && (
            <div className="curve">
              <Curve
                onClickTop={() => {}}
                classNameTop="hidden"
                onClickBottom={() => this.toggleActiveTab("friendsList")}
                classNameBottom={friendsListPath}
                isAboveTabActive={false}
                hidden={false}
              />
            </div>
          )}

          <div
            className={friendsListClass}
            onClick={() => this.toggleActiveTab("friendsList")}
            role="menuitem"
            tabIndex="-1"
            onKeyDown={() => {}}
          >
            <FriendsList friends={friends} />
          </div>

          {(activeTab === "userPosts" || activeTab === "") && (
            <div className="curve">
              <Curve
                onClickTop={() => this.toggleActiveTab("friendsList")}
                classNameTop={friendsListPath}
                onClickBottom={() => this.toggleActiveTab("userPosts")}
                classNameBottom={userPostsPath}
                isAboveTabActive={false}
                hidden={false}
              />
            </div>
          )}

          <div
            className={userPostsClass}
            onClick={() => this.toggleActiveTab("userPosts")}
            role="menuitem"
            tabIndex="-1"
            onKeyDown={() => {}}
          >
            <h2 className="pagetitle">User Posts</h2>
            <NewsFeed userId={userId} profileId={profileId} type="user" />
          </div>

          {(activeTab === "likedPosts" || activeTab === "") && (
            <div className="curve">
              <Curve
                onClickTop={() => this.toggleActiveTab("userPosts")}
                classNameTop={userPostsPath}
                onClickBottom={() => this.toggleActiveTab("likedPosts")}
                classNameBottom={likedPostsPath}
                isAboveTabActive={false}
                hidden={false}
              />
            </div>
          )}
          <div
            className={likedPostsClass}
            onClick={() => this.toggleActiveTab("likedPosts")}
            role="menuitem"
            tabIndex="-1"
            onKeyDown={() => {}}
          >
            <h2 className="pagetitle">Liked Posts</h2>
            <NewsFeed userId={userId} profileId={profileId} type="liked" />
          </div>
        </div>
        <div height="62px" />
      </div>
    );
  }
}

ProfilePage.propTypes = {
  match: PropTypes.shape({}).isRequired,
  userId: PropTypes.string.isRequired,
  handleLogout: PropTypes.func.isRequired,
  makeNotification: PropTypes.func.isRequired
};

Curve.propTypes = {
  onClickTop: PropTypes.func.isRequired,
  classNameTop: PropTypes.string.isRequired,
  onClickBottom: PropTypes.func.isRequired,
  classNameBottom: PropTypes.string.isRequired,
  isAboveTabActive: PropTypes.bool.isRequired
};

export default ProfilePage;
