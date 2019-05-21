import React, { Component } from "react";
import PropTypes from "prop-types";
import "../../colors.css";
import firebaseWrapper from "../../firebaseWrapper";
import "./styles.css";

class MessageTile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "John Doe",
      photoURL: "",
      isSelected: false
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

  componentWillReceiveProps(nextProps) {
    if (nextProps.isSelected != this.state.isSelected) {
      this.setState({
        isSelected: nextProps.isSelected
      });
    }
  }

  render() {
    const { name, photoURL } = this.state;
    const { isSelected } = this.props;
    return (
      <div
        className="tile-wrapper"
        style={{
          "background-color": isSelected ? "var(--light-teal)" : "var(--white)"
        }}
      >
        <div className="profile-picture">
          <img src={photoURL} />
        </div>
        <div className="user-name">
          <p>{name}</p>
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
