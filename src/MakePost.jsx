import React, { Component } from "react";
import Firebase from "firebase";
import "./MakePost.css";
import ReactDOM from "react-dom";

class MakePost extends React.Component {
  constructor(props) {
    super(props);
    this.postref = Firebase.database().ref("testposts");
    this.state = {
      uid: this.props.userid,
      text: "",
      photo: null,
      likes: 0,
      timestamp: null
    };
  }

  componentDidMount() {}

  textInputHandler = event => {
    this.setState({ text: event.target.value });
  };

  fileUploadHandler = event => {
    this.setState({ photo: URL.createObjectURL(event.target.files[0]) });
  };

  postSubmitHandler = event => {
    event.preventDefault();
    this.postref.push({
      user_id: this.state.uid,
      text: this.state.text,
      photo: this.state.photo,
      likes: this.state.likes,
      timestamp: new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      }).format(Date.now())
    });
    this.setState({ text: "", photo: null, likes: 0, timestamp: null });
  };

  render() {
    return (
      <div>
        <h1>Make a Post</h1>
        <textarea
          className="post"
          type="text"
          onChange={this.textInputHandler}
        />
        <div>
          <input
            type="file"
            accept="image/*"
            onChange={this.fileUploadHandler}
          />
        </div>
        <div>
          <button type="submit" onClick={this.postSubmitHandler}>
            Submit
          </button>
        </div>
      </div>
    );
  }
}

export default MakePost;
