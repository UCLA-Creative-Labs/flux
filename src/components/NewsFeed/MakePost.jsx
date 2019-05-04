import React from "react";
import "./MakePost.css";
import PropTypes from "prop-types";
import firebaseWrapper from "../../firebaseWrapper";

class MakePost extends React.Component {
  constructor(props) {
    super(props);
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
    const resetState = () => {
      this.setState({ text: "", photo: null, likes: 0 });
    };
    event.preventDefault();
    if (photo !== null) {
      firebaseWrapper.sendPostWithPhoto(userId, text, likes, photo, resetState);
    } else {
      firebaseWrapper.sendPost(userId, text, likes);
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
