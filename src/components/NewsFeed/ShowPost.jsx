import React, { Component } from "react";
import posed from "react-pose";
import PropTypes from "prop-types";
import Polygon from "../../images/Polygon.svg";
import seeMore from "../../images/seeMore.svg";
import "./ShowPost.css";
import firebaseWrapper from "../../firebaseWrapper";

const Animate = posed.div({
  draggable: true,
  init: { scale: 1, zIndex: 1 },
  drag: { scale: 1.2, zIndex: 2 },
  dragEnd: {
    x: 0,
    y: 0,
    zIndex: 1,
    transition: { type: "spring" }
  }
});

class ShowPost extends Component {
  inLikeIcon = event => {
    for (let i = 0; i < 16; i += 2) {
      const rect = document.getElementById(`icon${i}`).getBoundingClientRect();

      if (
        event.x > rect.left &&
        event.x < rect.right &&
        event.y < rect.bottom &&
        event.y > rect.top
      ) {
        return true;
      }
    }
    return false;
  };

  inDislikeIcon = event => {
    for (let i = 1; i < 16; i += 2) {
      const rect = document.getElementById(`icon${i}`).getBoundingClientRect();

      if (
        event.x > rect.left &&
        event.x < rect.right &&
        event.y < rect.bottom &&
        event.y > rect.top
      ) {
        return true;
      }
    }
    return false;
  };

  onDragEnd = event => {
    const { postId, postObject, userId } = this.props;

    if (this.inLikeIcon(event)) {
      firebaseWrapper.incrementLike(postObject.likes, postId, userId);
    }
    if (this.inDislikeIcon(event)) {
      firebaseWrapper.decrementLike(postObject.likes, postId);
    }
  };

  render() {
    const { postId, postObject, onClick, type } = this.props;

    if (type === "home") {
      return (
        <Animate onDragEnd={this.onDragEnd} className="showPost">
          <div className="card">
            <div className="colorbox" />
            <div className="ShowPostContainer">
              <span className="letter">{postObject.text[0]}</span>
              <img className="arrow" src={Polygon} alt="" />
              <img className="seemore" src={seeMore} alt="" />
              <button
                type="button"
                className="seemorebutton"
                onClick={() => onClick(postId)}
              />
            </div>
            <div className="r1" />
            <div className="r2" />
          </div>
        </Animate>
      );
    }

    return (
      <div className="showPost">
        <div className="card">
          <div className="colorbox" />
          <div className="ShowPostContainer">
            <span className="letter">{postObject.text[0]}</span>
            <img className="arrow" src={Polygon} alt="" />
            <img className="seemore" src={seeMore} alt="" />
            <button
              type="button"
              className="seemorebutton"
              onClick={() => onClick(postId)}
            />
          </div>
          <div className="r1" />
          <div className="r2" />
        </div>
      </div>
    );
  }
}

ShowPost.propTypes = {
  postObject: PropTypes.shape({
    userId: PropTypes.string,
    timestamp: PropTypes.string,
    text: PropTypes.string,
    photo: PropTypes.string,
    likes: PropTypes.number
  }).isRequired,
  postId: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["home", "user", "liked"]).isRequired
};

export default ShowPost;
