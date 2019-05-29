import React, { Component } from "react";
import PropTypes from "prop-types";
import "./styles.css";

class ControlBlob extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div id="control-blob">
        <div id="circle" />
        <div id="blob">
          {/* <textarea placeholder="PLEASE TYPE YOUR MESSAGE" /> */}
          WHAT'S ON
          <br />
          YOUR MIND?
        </div>
      </div>
    );
  }
}

export default ControlBlob;
