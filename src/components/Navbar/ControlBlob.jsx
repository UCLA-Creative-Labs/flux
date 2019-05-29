import React, { Component } from "react";
import PropTypes from "prop-types";
import LikeIcon from "../../images/Navbar/like.svg";
import DislikeIcon from "../../images/Navbar/dislike.svg";
import "./styles.css";

class ControlBlob extends Component {
  constructor() {
    super();
  }

  generateIcons = () => {
    const numIcons = 16;
    const angleSpacing = 360 / numIcons;

    let angleClasses = [];

    for (let i = 0; i < numIcons; i++) {
      const angle = i * angleSpacing;
      angleClasses.push(angle.toString().replace(".", "_"));
    }

    return (
      <div id="circle">
        {angleClasses.map((angle, i) => {
          console.log(angle);
          return (
            <img
              src={i % 2 == 0 ? LikeIcon : DislikeIcon}
              className={`icon deg${angle}`}
              key={angle}
            />
          );
        })}
      </div>
    );
  };

  render() {
    return (
      <div id="control-blob">
        {this.generateIcons()}
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
