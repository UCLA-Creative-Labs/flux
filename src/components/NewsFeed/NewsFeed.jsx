import React, { Component } from "react";
import Firebase from "firebase";
import PropTypes from "prop-types";
import ShowPost from "./ShowPost";
import ExpandedPost from "./ExpandedPost";
import "./NewsFeed.css";

const PopUp = ({ userId, text, onClick }) => (
  <div className="popup" onClick={onClick}>
    <span className="c1" />
    <span className="c2" />
    <span className="c3" />
    <span className="c4" />
    <span className="c5" />
    <span className="c6" />
    <div className="popup-inner">
      <ExpandedPost userId={userId} text={text} />
    </div>
  </div>
);

class NewsFeed extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      posts: {},
      selectedPost: "",
      showSelectedPost: false
    };
  }

  componentDidMount() {
    const postRef = Firebase.database().ref("posts");
    postRef.on("value", snapshot => {
      this.setState({
        posts: snapshot.val()
      });
    });
  }

  seeMoreHandler = postId => {
    console.log("CLicked btn");
    this.toggleSelectedPost();
    this.setState({ selectedPost: postId });
  };

  toggleSelectedPost = () => {
    this.setState({ showSelectedPost: true });
  };

  toggleClose = () => {
    this.setState({ showSelectedPost: false });
  };

  render() {
    const { posts, selectedPost, showSelectedPost } = this.state;
    const { userId } = this.props;
    return (
      <div className="container">
        <div className="SearchBar">
          <input className="search" placeholder="SEARCH" />
        </div>
        {showSelectedPost && posts[selectedPost] !== undefined ? (
          <PopUp
            userId={posts[selectedPost].userId}
            text={posts[selectedPost].text}
            onClick={this.toggleClose}
          />
        ) : null}
        <div className="flex-container">
          {Object.keys(posts)
            .reverse()
            .map(post => (
              <ShowPost
                postId={post}
                postObject={posts[post]}
                userId={userId}
                onClick={this.seeMoreHandler}
              />
            ))}
        </div>
      </div>
    );
  }
}

NewsFeed.propTypes = {
  userId: PropTypes.string.isRequired
};

PopUp.propTypes = {
  userId: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};
export default NewsFeed;
