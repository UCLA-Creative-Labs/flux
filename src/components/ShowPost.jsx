import React, { Component } from "react";
import "./ShowPost.css";
import Firebase from "firebase";

let posts = {};
class ShowPost extends Component {
  constructor(props, context) {
    super(props, context);
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
      </div>
    );
  }
}
export default ShowPost;
