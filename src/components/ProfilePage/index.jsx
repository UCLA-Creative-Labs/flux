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
  classNameBottom
}) => {
  return (
    <div className="curve">
      <svg
        className="svg"
        width="100%"
        height="100%"
        viewBox="0 0 1400 78"
        preserveAspectRatio="xMinYMin slice"
      >
        <path
          className={classNameTop}
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
    </div>
  );
};

const WavyLines = () => {
  return (
    <div className="wavylines">
      <svg
        className="svg"
        width="100%"
        height="100%"
        viewBox="0 -30 1400 87"
        preserveAspectRatio="xMinYMin slice"
      >
        <path
          d="m 0,48.867516 v -50 c 500,99.999994 949.99997,-99.999996 1400,0 v 50 z"
          style={{ fill: "#9cb1db" }}
        />
        <path
          style={{ fill: "#ffffff" }}
          d="m 0,58.867516 v -50 c 500,99.999994 949.99997,-99.999996 1400,0 v 50 z"
        />
        <path
          d="m 0,68.867516 v -50 c 500,99.999994 949.99997,-99.999996 1400,0 v 50 z"
          style={{ fill: "#9cb1db" }}
        />
        <path
          style={{ fill: "#ffffff" }}
          d="m 0,78.867516 v -50 c 500,99.999994 949.99997,-99.999996 1400,0 v 50 z"
        />
      </svg>
    </div>
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
    this.renderProfilePage();
  }

  toggleActiveTab = activeTab => {
    this.setState({
      activeTab
    });
  };

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

  renderProfilePage() {
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

  render() {
    const {
      userId,
      match: {
        params: { profileId }
      }
    } = this.props;
    const { firstName, lastName } = this.state;

    const { friends, profilePicture, activeTab } = this.state;
    let userPostsClass = "preview";
    let userPostsPath = "active";
    let likedPostsClass = "preview";
    let likedPostsPath = "active";
    let friendsListClass = "preview";
    let friendsListPath = "active";
    if (activeTab === "userPosts") {
      userPostsClass = "active";
    } else if (activeTab === "likedPosts") {
      likedPostsClass = "active";
    } else if (activeTab === "friendsList") {
      friendsListClass = "active";
    }
    userPostsClass = userPostsClass.concat(" userPosts");
    userPostsPath = userPostsPath.concat(" userPostsPath");
    likedPostsClass = likedPostsClass.concat(" likedPosts");
    likedPostsPath = likedPostsPath.concat(" likedPostsPath");
    friendsListClass = friendsListClass.concat(" friendsList");
    friendsListPath = friendsListPath.concat(" friendsListPath");
    return (
      <div className="profilePage">
        <div className="userInfo">
          <h1 className="profileName">
            {firstName} {lastName}
          </h1>
          {profileId !== userId && !(userId in friends) && (
            <button
              type="button"
              className="addFriendButton"
              onClick={this.addFriend}
            >
              + ADD FRIEND
            </button>
          )}
          <img src={profilePicture} alt="Profile" className="profilePicture" />
        </div>
        <WavyLines />
        <div className="posts">
          <Curve
            onClickTop={() => {}}
            classNameTop="hidden"
            onClickBottom={() => this.toggleActiveTab("friendsList")}
            classNameBottom={friendsListPath}
            isAboveTabActive={false}
          />

          <div
            className={friendsListClass}
            onClick={() => this.toggleActiveTab("friendsList")}
            role="menuitem"
            tabIndex="-1"
            onKeyDown={() => {}}
          >
            <h1 className="title">FRIENDS</h1>
            <FriendsList friends={friends} action={this.renderProfilePage} />
          </div>

          <Curve
            onClickTop={() => this.toggleActiveTab("friendsList")}
            classNameTop={friendsListPath}
            onClickBottom={() => this.toggleActiveTab("userPosts")}
            classNameBottom={userPostsPath}
            isAboveTabActive={false}
          />

          <div
            className={userPostsClass}
            onClick={() => this.toggleActiveTab("userPosts")}
            role="menuitem"
            tabIndex="-1"
            onKeyDown={() => {}}
          >
            <h1 className="title">USER POSTS</h1>
            <NewsFeed userId={userId} profileId={profileId} type="user" />
          </div>

          <Curve
            onClickTop={() => this.toggleActiveTab("userPosts")}
            classNameTop={userPostsPath}
            onClickBottom={() => this.toggleActiveTab("likedPosts")}
            classNameBottom={likedPostsPath}
            isAboveTabActive={false}
          />

          <div
            className={likedPostsClass}
            onClick={() => this.toggleActiveTab("likedPosts")}
            role="menuitem"
            tabIndex="-1"
            onKeyDown={() => {}}
          >
            <h1 className="title">LIKED POSTS</h1>
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
  makeNotification: PropTypes.func.isRequired
};

Curve.propTypes = {
  onClickTop: PropTypes.func.isRequired,
  classNameTop: PropTypes.string.isRequired,
  onClickBottom: PropTypes.func.isRequired,
  classNameBottom: PropTypes.string.isRequired
};

export default ProfilePage;
