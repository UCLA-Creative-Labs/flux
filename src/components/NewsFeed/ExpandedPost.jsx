import React, { Component } from "react";
import "./ExpandedPost.css";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import firebaseWrapper from "../../firebaseWrapper";

class ExpandedPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profilePicture: null,
      firstName: "",
      lastName: ""
    };
  }

  componentDidMount() {
    const { userId } = this.props;

    const setName = (firstName, lastName) => {
      this.setState({ firstName, lastName });
    };
    const setProfilePicture = url => {
      this.setState({ profilePicture: url });
    };

    firebaseWrapper.getProfilePicture(userId, setProfilePicture);
    firebaseWrapper.getName(userId, setName);
  }

  render() {
    const { userId, text, photo, likes } = this.props;

    const { profilePicture, firstName, lastName } = this.state;
    return (
      <div className="contain">
        <div className="color">
          <Link to={`/user/${userId}`} className="name">
            {firstName} {lastName}
          </Link>
        </div>
        <div className="expandedPost">
          <img className="profpic" src={profilePicture} alt="" />
          <div className="postcontents">
            <p className="likeCount">
              {likes} LIKE{likes === 1 ? null : "S"}
            </p>
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
  photo: PropTypes.string,
  likes: PropTypes.number.isRequired
};

export default ExpandedPost;
