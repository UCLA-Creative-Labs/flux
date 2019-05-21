import React, { Component } from "react";
import PropTypes from "prop-types";
import firebaseWrapper from "../../firebaseWrapper";
import "./styles.css";

class MessageTile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "John Doe",
      photoURL: ""
    };
  }

  componentDidMount() {
    const { userId } = this.props;

    //Fetch user data!
    const updateName = name => {
      this.setState({
        name: name
      });
    };
    const updatePicture = picurl => {
      this.setState({
        photoURL: picurl
      });
    };
    //firebaseWrapper.getName(userId, updateName); Not implemented yet!
    firebaseWrapper.getProfilePicture(userId, updatePicture);
  }

  render() {
    const { name, photoURL } = this.state;
    return (
      <div className="tile-wrapper">
        <div className="profile-picture">
          <img className="picture" src={photoURL} />
        </div>
        <div className="user-name">
          <p>{name}</p>
        </div>
      </div>
    );
  }
}

MessageTile.propTypes = {
  userId: PropTypes.string.isRequired
};

export default MessageTile;
