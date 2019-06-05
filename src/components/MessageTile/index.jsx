import React, { Component } from "react";
import PropTypes from "prop-types";
import "../../colors.css";
import firebaseWrapper from "../../firebaseWrapper";
import "./styles.css";

class MessageTile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
      photoURL: "",
      isSelected: false
    };
  }

  componentDidMount() {
    const { userId } = this.props;

    const updateName = (firstName, lastName) => {
      this.setState({
        firstName,
        lastName
      });
    };
    const updatePicture = picurl => {
      this.setState({
        photoURL: picurl
      });
    };
    firebaseWrapper.getName(userId, updateName);
    firebaseWrapper.getProfilePicture(userId, updatePicture);
  }

  componentWillReceiveProps(nextProps) {
    const { isSelected } = this.state;
    if (nextProps.isSelected !== isSelected) {
      this.setState({
        isSelected: nextProps.isSelected
      });
    }
  }

  render() {
    const { firstName, lastName, photoURL } = this.state;
    const { isSelected } = this.props;
    return (
      <div
        className="tile-wrapper"
        style={{
          backgroundColor: isSelected ? "var(--light-teal)" : "var(--white)"
        }}
      >
        <div
          className="empty-box"
          style={{
            backgroundColor: isSelected ? "var(--dark-teal)" : "var(--white)"
          }}
        />
        <div className="profile-picture">
          <img src={photoURL} alt="profile-pic" />
        </div>
        <div className="user-name">
          <p>
            {firstName} {lastName}
          </p>
        </div>
      </div>
    );
  }
}

MessageTile.propTypes = {
  userId: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired
};

export default MessageTile;
