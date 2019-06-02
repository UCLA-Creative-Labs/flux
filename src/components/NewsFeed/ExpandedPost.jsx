import React, { Component } from "react";
import "./ExpandedPost.css";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import firebaseWrapper from "../../firebaseWrapper";

class ExpandedPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profilePicture: null
    };
  }

  componentDidMount() {
    this.getProfilePicture();
  }

  getProfilePicture = () => {
    const { userId } = this.props;
    firebaseWrapper.getProfilePicture(userId, this.setProfilePicture);
  };

  setProfilePicture = url => {
    this.setState({ profilePicture: url });
  };

  render() {
    const { userId, text, photo } = this.props;
    const { profilePicture } = this.state;
    return (
      <div className="contain">
        <div className="color">
          <Link to={`/user/${userId}`} className="name">
            {userId}
          </Link>
        </div>
        <div className="expandedPost">
          <img className="profpic" src={profilePicture} alt="" />
          <div className="postcontents">
            {text !== "" ? (
              <p className="text">
                <span className="dropcap">{text[0]}</span>
                {text.substr(1)}
              </p>
            ) : null}

            <img className="postphoto" src={photo} alt="" />
          </div>
        </div>
      </div>
    );
  }
}

ExpandedPost.defaultProps = {
  photo: null
};

ExpandedPost.propTypes = {
  userId: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  photo: PropTypes.string
};

export default ExpandedPost;
