import React, { Component } from "react";
import Firebase from "firebase";
import PropTypes from "prop-types";
import ShowPost2 from "./ShowPost";
import ExpandedPost from "./ExpandedPost";
import "./NewsFeed.css";

class NewsFeed extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      posts: {},
      selectedPost: ""
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
    this.setState({ selectedPost: postId });
  };

  render() {
    const { posts, selectedPost } = this.state;
    const { userId } = this.props;
    console.log(selectedPost);
    return (
      <div>
        <div className="SearchBar">
          <input className="search" placeholder="SEARCH" />
        </div>
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
        {posts[selectedPost] !== undefined && (
          <ExpandedPost postObject={posts[selectedPost]} />
        )}
      </div>
    );
  }
}

NewsFeed.propTypes = {
  userId: PropTypes.string.isRequired
};
export default NewsFeed;
