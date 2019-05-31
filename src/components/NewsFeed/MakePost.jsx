import React from "react";
import PropTypes from "prop-types";
import firebaseWrapper from "../../firebaseWrapper";
import "./MakePost.css";

class MakePost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      photo: null
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
    const resetState = () => {
      this.setState({ text: "", photo: null });
    };
    const { userId, makeNotification } = this.props;
    const { photo, text } = this.state;
    event.preventDefault();

    makeNotification("makePost", `${userId}`);
    firebaseWrapper.sendPost(userId, text, photo, resetState);
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
  userId: PropTypes.string.isRequired,
  makeNotification: PropTypes.func.isRequired
};

export default MakePost;
