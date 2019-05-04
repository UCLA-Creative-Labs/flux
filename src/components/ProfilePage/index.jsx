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
    const { userId } = this.props;
    const updateFriends = friends => {
      this.setState({
        friends
      });
    };
    firebaseWrapper.getAllFriends(userId, updateFriends);
  }

  render() {
    const { userId } = this.props;
    const { friends } = this.state;
    return (
      <div>
        <div>Profile Picture here</div>
        <h1>{userId}</h1>
        <FriendsList friends={friends} />
      </div>
    );
  }
}

ProfilePage.propTypes = {
  userId: PropTypes.string.isRequired
};

export default ProfilePage;
