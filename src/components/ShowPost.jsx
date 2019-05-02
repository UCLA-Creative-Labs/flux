import React, { Component } from "react";
import "./ShowPost.css";
import PropTypes from "prop-types";
import Firebase from "firebase";

class ShowPost extends Component {
  constructor(props, context) {
    super(props, context);
  }

  incrementLike(likes) {
    likes++;
    Firebase.database()
      .ref("posts")
      .child(this.props.id)
      .update({ likes: likes });
  }
  render() {
    return (
      <div id="ShowPostContainer">
        <p>post: {this.props.id}</p>
        <p>user_id: {this.props.post_id.user_id}</p>
        <p>timestamp: {this.props.post_id.timestamp}</p>
        <p>text: {this.props.post_id.text}</p>
        <p>photo: {this.props.post_id.photo}</p>
        <p>likes: {this.props.post_id.likes}</p>
        <button
          type="submit"
          onClick={() => {
            this.incrementLike(this.props.post_id.likes);
          }}
        >
          Like!
        </button>
      </div>
    );
  }
}

ShowPost.propTypes = {
  user_id: PropTypes.number,
  timestamp: PropTypes.string,
  text: PropTypes.string,
  likes: PropTypes.number
};

export default ShowPost;
