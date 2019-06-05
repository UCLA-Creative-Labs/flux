import React, { Component } from "react";
import PropTypes from "prop-types";
import "./FriendsList.css";
import firebaseWrapper from "../../firebaseWrapper";

class FriendListing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      pictureURL: ""
    };
  }

  componentDidMount() {
    const { id } = this.props;
    const getName = (first, last) => {
      this.setState({
        name: `${first} ${last}`
      });
    };
    const getPictureURL = pictureURL => {
      this.setState({
        pictureURL
      });
    };
    firebaseWrapper.getName(id, getName);
    firebaseWrapper.getProfilePicture(id, getPictureURL);
  }

  render() {
    const { name, pictureURL } = this.state;
    return (
      <div className="friendListing">
        <img alt="profile" className="picture" src={pictureURL} />
        <p className="friendName">{name}</p>
      </div>
    );
  }
}

FriendListing.propTypes = {
  id: PropTypes.string.isRequired
};

export default FriendListing;
