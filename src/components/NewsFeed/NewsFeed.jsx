import React, { Component } from "react";
import Firebase from "firebase";
import PropTypes from "prop-types";
import ShowPost2 from "./ShowPost";
import ExpandedPost from "./ExpandedPost";
import "./NewsFeed.css";

const PopUp = ({ userId, text }) => (
  <div className="popup">
    <section className="popup-inner">
      <ExpandedPost userId={userId} text={text} />
    </section>
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

  toggleSelectedPost() {
    this.setState({ showSelectedPost: true });
  }

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
          />
        ) : null}
        <div className="flex-container">
          {Object.keys(posts)
            .reverse()
            .map(post => (
              <ShowPost2
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
  text: PropTypes.string.isRequired
};
export default NewsFeed;
