import React, { Component } from "react";
import posed from "react-pose";
import PropTypes from "prop-types";
import firebaseWrapper from "../../firebaseWrapper";
import DefaultProfilePicture from "../../images/Profile/default-profile-picture.svg";
import "./styles.css";

const Animate = posed.div({
  draggable: "x",
  dragBounds: { left: -354, right: "0" }
});

class Step1 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
      profilePicture: DefaultProfilePicture
    };

    this.sliderButtonRef = React.createRef();
    this.sliderRef = React.createRef();
  }

  componentDidMount() {
    const { userId } = this.props;

    const updateProfilePicture = profilePicture => {
      this.setState({ profilePicture });
    };

    firebaseWrapper.getProfilePicture(userId, updateProfilePicture);
  }

  handleFirstNameChange = event => {
    this.setState({ firstName: event.target.value });
  };

  handleLastNameChange = event => {
    this.setState({ lastName: event.target.value });
  };

  redirectToLoading = () => {
    const rootLocation = window.location.href.match(/.*\/\/.*?\//)[0];
    const redirectLocation = `${rootLocation}loading`;
    window.location.replace(redirectLocation);
  };

  submitForm = () => {
    const { userId } = this.props;
    const { firstName, lastName } = this.state;

    if (firstName !== "" && lastName !== "") {
      firebaseWrapper.updateName(userId, firstName, lastName);
      this.redirectToLoading();
    }
  };

  onDragEnd = () => {
    const button = this.sliderButtonRef.current.getBoundingClientRect();
    const slider = this.sliderRef.current.getBoundingClientRect();

    if (button.left === slider.left) {
      this.submitForm();
    }
  };

  render() {
    const { firstName, lastName, profilePicture } = this.state;

    return (
      <div id="step1">
        <div className="modal">
          <form>
            <div id="image-container">
              <img src={profilePicture} id="profile-picture" alt="profile" />
            </div>

            <div id="text-container">
              <label htmlFor="firstname">
                FIRST NAME
                <br />
                <input
                  type="text"
                  value={firstName}
                  onChange={this.handleFirstNameChange}
                  name="firstName"
                />
              </label>

              <label htmlFor="lastName">
                LAST NAME
                <br />
                <input
                  type="text"
                  value={lastName}
                  onChange={this.handleLastNameChange}
                  name="lastName"
                />
              </label>
            </div>
          </form>
          <div id="slider" ref={this.sliderRef}>
            <Animate
              className="button"
              onDragEnd={this.onDragEnd}
              ref={this.sliderButtonRef}
            >
              CONTINUE
            </Animate>
          </div>
        </div>
      </div>
    );
  }
}

Step1.propTypes = {
  userId: PropTypes.string.isRequired
};

export default Step1;
