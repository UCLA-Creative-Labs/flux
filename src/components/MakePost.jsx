import React from "react";
import Firebase from "firebase";
import "./MakePost.css";
import PropTypes from "prop-types";

class MakePost extends React.Component {
  constructor(props) {
    super(props);
    this.postref = Firebase.database().ref("posts");
    const { userID } = this.props;
    this.state = {
      uid: userID,
      text: "",
      photo: null,
      likes: 0
    };
  }

  componentDidMount() {}

  textInputHandler = event => {
    this.setState({ text: event.target.value });
  };

  fileUploadHandler = () => {
    const pic = document.getElementById("fileItem").files[0];
    this.setState({ photo: pic });
  };

  postSubmitHandler = event => {
    const { userID } = this.props;
    const { photo, uid, text, likes } = this.state;
    event.preventDefault();
    if (photo !== null) {
      const time = Date.now();
      this.storageref = Firebase.storage()
        .ref()
        .child(`users/${userID}${time}.jpg`);
      this.storageref.put(photo).then(() => {
        this.storageref.getDownloadURL().then(url => {
          const photoURL = url;
          this.postref.push({
            userID: uid,
            text,
            photo: photoURL,
            likes,
            timestamp: new Intl.DateTimeFormat("en-US", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit"
            }).format(time),
            likedPosts: ["hello"]
          });
          this.setState({ text: "", photo: null, likes: 0 });
        });
      });
    } else {
      this.postref.push({
        userID: uid,
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

MakePost.propTypes = {
  userID: PropTypes.string.isRequired
};

export default MakePost;
