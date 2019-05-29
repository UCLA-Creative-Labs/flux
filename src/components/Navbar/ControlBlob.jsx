import React, { Component } from "react";
import LikeIcon from "../../images/Navbar/like.svg";
import DislikeIcon from "../../images/Navbar/dislike.svg";
import "./styles.css";

class ControlBlob extends Component {
  generateIcons = () => {
    const numIcons = 16;
    const angleSpacing = 360 / numIcons;

    const angleClasses = [];

    for (let i = 0; i < numIcons; i += 1) {
      const angle = i * angleSpacing;
      angleClasses.push(angle.toString().replace(".", "_"));
    }

    return (
      <div id="circle">
        {angleClasses.map((angle, i) => {
          return (
            <img
              src={i % 2 === 0 ? LikeIcon : DislikeIcon}
              alt={i % 2 === 0 ? "like icon" : "dislike icon"}
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
          WHAT&apos;S ON
          <br />
          YOUR MIND?
        </div>
      </div>
    );
  }
}

export default ControlBlob;
