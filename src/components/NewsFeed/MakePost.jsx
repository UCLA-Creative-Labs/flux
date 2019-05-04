import React from "react";
import Firebase from "firebase";
import "./MakePost.css";
import PropTypes from "prop-types";

class MakePost extends React.Component {
  constructor(props) {
    super(props);
    this.postref = Firebase.database().ref("posts");
    this.state = {
      text: "",
      photo: null,
      likes: 0
    };
  }

  textInputHandler = event => {
    this.setState({ text: event.target.value });
  };

  fileUploadHandler = () => {
    const pic = document.getElementById("fileItem").files[0];
    this.setState({ photo: pic });
  };

  postSubmitHandler = event => {
    const { userId } = this.props;
    const { photo, text, likes } = this.state;
    event.preventDefault();
    if (photo !== null) {
      const time = Date.now();
      this.storageref = Firebase.storage()
        .ref()
        .child(`users/${userId}${time}.jpg`);
      this.storageref.put(photo).then(() => {
        this.storageref.getDownloadURL().then(url => {
          const photoURL = url;
          this.postref.push({
            userId,
            text,
            photo: photoURL,
            likes,
            timestamp: new Intl.DateTimeFormat("en-US", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit"
            }).format(time)
          });
          this.setState({ text: "", photo: null, likes: 0 });
        });
      });
    } else {
      this.postref.push({
        userId,
        text,
        likes,
        timestamp: new Intl.DateTimeFormat("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit"
        }).format(Date.now())
      });
      this.setState({ text: "", photo: null, likes: 0 });
    }
  };

  render() {
    const { text } = this.state;
    return (
      <div className="MakePost">
        <h1>Make a Post</h1>
        <textarea
          className="post"
          type="text"
          value={text}
          placeholder="Type something..."
          onChange={this.textInputHandler}
        />

        <input
          id="fileItem"
          type="file"
          accept="image/*"
          onChange={this.fileUploadHandler}
        />

        <button type="submit" onClick={this.postSubmitHandler}>
          Post
        </button>
      </div>
    );
  }
}

MakePost.propTypes = {
  userId: PropTypes.string.isRequired
};

export default MakePost;
