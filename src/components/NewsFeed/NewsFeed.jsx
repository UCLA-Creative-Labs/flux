import React, { Component } from "react";
import Firebase from "firebase";
import PropTypes from "prop-types";
import MakePost from "./MakePost";
import ShowPost2 from "./ShowPost";
import "./NewsFeed.css";

class NewsFeed extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      posts: {}
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

  render() {
    const { posts } = this.state;
    const { userId } = this.props;
    return (
      <div>
        <div className="SearchBar">
          <input className="search" placeholder="search" />
        </div>
        <div className="flex-container">
          {Object.keys(posts)
            .reverse()
            .map(post => (
              <ShowPost2
                postId={post}
                postObject={posts[post]}
                userId={userId}
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
export default NewsFeed;
