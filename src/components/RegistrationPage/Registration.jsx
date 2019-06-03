import React, { Component } from "react";
// import PropTypes from "prop-types";
import "./Registration.css";
import Page1Modal from "./Page1Modal";

class Registration extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="registration">
        <div className="container">
          <Page1Modal />
        </div>
      </div>
    );
  }
}

export default Registration;
