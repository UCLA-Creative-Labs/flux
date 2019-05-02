import React, { Component } from "react";
import Firebase from "firebase";
import "./MakePost.css";
import ReactDOM from "react-dom";
import { publicDecrypt } from "crypto";
import { POINT_CONVERSION_UNCOMPRESSED } from "constants";

class MakePost extends React.Component {
  constructor(props) {
    super(props);
    this.postref = Firebase.database().ref("posts");
    this.state = {
      uid: this.props.userID,
      text: "",
      photo: null,
      likes: 0,
      timestamp: null,
      likedPosts: ["hello"]
    };
  }

  componentDidMount() {}

  textInputHandler = event => {
    this.setState({ text: event.target.value });
  };

  fileUploadHandler = event => {
    var pic = document.getElementById("fileItem").files[0];
    this.setState({ photo: pic });
  };

  postSubmitHandler = event => {
    event.preventDefault();
    if (this.state.photo !== null) {
      let time = Date.now();
      this.storageref = Firebase.storage()
        .ref()
        .child("users/" + this.props.userID + time + ".jpg");
      this.storageref.put(this.state.photo).then(() => {
        this.storageref.getDownloadURL().then(url => {
          let photoURL = url;
          this.postref.push({
            userID: this.state.uid,
            text: this.state.text,
            photo: photoURL,
            likes: this.state.likes,
            timestamp: new Intl.DateTimeFormat("en-US", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit"
            }).format(time)
          });
          this.setState({ text: "", photo: null, likes: 0, timestamp: null });
        });
      });
    } else {
      this.postref.push({
        userID: this.state.uid,
        text: this.state.text,
        //photo: photoURL,
        likes: this.state.likes,
        timestamp: new Intl.DateTimeFormat("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit"
        }).format(Date.now())
      });
      this.setState({ text: "", photo: null, likes: 0, timestamp: null });
    }
  };

  render() {
    return (
      <div className="MakePost">
        <h1>Make a Post</h1>
        <textarea
          className="post"
          type="text"
          value={this.state.text}
          placeholder="Type something..."
          onChange={this.textInputHandler}
        />
        <div>
          <input
            id="fileItem"
            type="file"
            accept="image/*"
            onChange={this.fileUploadHandler}
          />
        </div>
        <div>
          <button type="submit" onClick={this.postSubmitHandler}>
            Post
          </button>
        </div>
      </div>
    );
  }
}

export default MakePost;
