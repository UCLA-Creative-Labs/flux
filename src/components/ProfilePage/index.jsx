import React, { Component } from "react";
import PropTypes from "prop-types";
import FriendsList from "./FriendsList";

class ProfilePage extends Component {
    //user_id will be passed in as props
    constructor(props) {
        super(props);

        this.state = {
            likedPosts: [],
            userPosts: [],
            friends: [],
            activeTab: ""
        }
    }

    render() {
        const { userId } = this.props;
        return (
            <div>
                <div>Profile Picture here</div>
                <h1>{userId}</h1>
                <FriendsList/>
            </div>
        )
    }
}

ProfilePage.propTypes = {
    userId: PropTypes.string.isRequired
}

export default ProfilePage;