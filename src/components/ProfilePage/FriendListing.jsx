import React, { Component } from "react";
import PropTypes from "prop-types";
import "./FriendsList.css";
import { Link } from "react-router-dom";
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
    const { id, action } = this.props;
    return (
      <div className="friendListing">
        <img alt="profile" className="picture" src={pictureURL} />
        <Link to={`/user/${id}`} className="friendName" onClick={action}>
          {name}
        </Link>
      </div>
    );
  }
}

FriendListing.propTypes = {
  id: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired
};

export default FriendListing;
