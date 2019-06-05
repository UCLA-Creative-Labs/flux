import React from "react";
import "./ShowPost.css";
import PropTypes from "prop-types";
import Polygon from "../../images/Polygon.svg";
import seeMore from "../../images/seeMore.svg";

const ShowPost = ({ postId, postObject, onClick }) => (
  <div>
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

ShowPost.propTypes = {
  postObject: PropTypes.shape({
    userID: PropTypes.number,
    timestamp: PropTypes.string,
    text: PropTypes.string,
    photo: PropTypes.string,
    likes: PropTypes.number
  }).isRequired,
  postId: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default ShowPost;
