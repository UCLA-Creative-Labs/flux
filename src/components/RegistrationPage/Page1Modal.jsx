import React, { Component } from "react";
// import PropTypes from "prop-types";
import "./Page1Modal.css";

class Page1Modal extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="p1">
        <span className="c1" />
        <span className="c2" />
        <div className="window">
          <h1>Hello</h1>
        </div>
      </div>
    );
  }
}

export default Page1Modal;
