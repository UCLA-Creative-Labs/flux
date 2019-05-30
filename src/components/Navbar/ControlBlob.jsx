import React, { Component } from "react";
import posed from "react-pose";
import LikeIcon from "../../images/Navbar/like.svg";
import DislikeIcon from "../../images/Navbar/dislike.svg";
import "./styles.css";

const Animate = posed.div({
  visible: { y: 50 },
  hidden: { y: 300 }
});

class ControlBlob extends Component {
  constructor() {
    super();
    this.state = {
      mounted: false
    };
  }

  componentDidMount() {
    this.setState({ mounted: true });
  }

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
    const { mounted } = this.state;

    return (
      <Animate pose={mounted ? "visible" : "hidden"} id="control-blob">
        {this.generateIcons()}
        <div id="blob">
          WHAT&apos;S ON
          <br />
          YOUR MIND?
        </div>
      </Animate>
    );
  }
}

export default ControlBlob;
