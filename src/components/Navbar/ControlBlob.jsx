import React, { Component } from "react";
import posed from "react-pose";
import PropTypes from "prop-types";
import firebaseWrapper from "../../firebaseWrapper";
import LikeIcon from "../../images/Navbar/like.svg";
import DislikeIcon from "../../images/Navbar/dislike.svg";
import "./styles.css";

const Animate = posed.div({
  visible: { y: "10vh", scale: 0.8 },
  hidden: { y: "50vh", scale: 0 },
  active: { y: "-5vh", scale: 1.5 }
});

class ControlBlob extends Component {
  constructor() {
    super();
    this.state = {
      mounted: false,
      active: false,
      postText: "",
      photo: null
    };
  }

  componentDidMount() {
    this.setState({ mounted: true });
  }

  onBlobClick = () => {
    this.setState(
      state => {
        return { active: !state.active, postText: "" };
      },
      () => {
        const { textarea } = this;

        if (textarea !== null) {
          textarea.focus();
        }
      }
    );
  };

  onBlobContentClick = event => {
    event.stopPropagation();
  };

  handleTextareaChange = event => {
    this.setState({ postText: event.target.value });
  };

  fileUploadHandler = () => {
    const pic = document.getElementById("photoUpload").files[0];
    this.setState({ photo: pic });
  };

  onTextareaKeyDown = event => {
    if (event.keyCode === 8) {
      event.preventDefault();

      const { userId, makeNotification } = this.props;
      const { postText, photo } = this.state;

      const resetState = () => {
        this.setState({ active: false, postText: "", photo: null });
      };

      makeNotification("makePost", `${userId}`);
      firebaseWrapper.sendPost(userId, postText, photo, resetState);
    }
  };

  determinePose = () => {
    const { mounted, active } = this.state;

    if (active) {
      return "active";
    }
    if (mounted) {
      return "visible";
    }
    return "hidden";
  };

  render() {
    const { active, postText } = this.state;

    // Generate angles for icon positioning
    const numIcons = 16;
    const angleSpacing = 360 / numIcons;
    const angleClasses = [];
    for (let i = 0; i < numIcons; i += 1) {
      const angle = i * angleSpacing;
      angleClasses.push(angle.toString().replace(".", "_"));
    }

    return (
      <Animate pose={this.determinePose()} id="control-blob">
        <div id="circle">
          {angleClasses.map((angle, i) => {
            return (
              <img
                src={i % 2 === 0 ? LikeIcon : DislikeIcon}
                alt={i % 2 === 0 ? "like icon" : "dislike icon"}
                className={`icon deg${angle}`}
                key={angle}
                id={`icon${i}`}
              />
            );
          })}
          <div
            id="blob"
            onClick={this.onBlobClick}
            onKeyDown={this.onBlobKeyDown}
          >
            {active ? (
              <div
                id="blob-content"
                onClick={this.onBlobContentClick}
                onKeyDown={this.onBlobContentKeyDown}
              >
                <textarea
                  value={postText}
                  onChange={this.handleTextareaChange}
                  placeholder="Please type your message..."
                  onKeyDown={this.onTextareaKeyDown}
                  ref={element => {
                    this.textarea = element;
                  }}
                />
                <label className="photo-upload-button" htmlFor="photoUpload">
                  <input
                    id="photoUpload"
                    type="file"
                    accept="image/*"
                    onChange={this.fileUploadHandler}
                  />
                  Add photo
                </label>
              </div>
            ) : (
              <p>
                WHAT&apos;S ON
                <br />
                YOUR MIND?
              </p>
            )}
          </div>
        </div>
      </Animate>
    );
  }
}

ControlBlob.propTypes = {
  userId: PropTypes.string.isRequired,
  makeNotification: PropTypes.func.isRequired
};

export default ControlBlob;
