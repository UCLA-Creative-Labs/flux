import React, { Component } from "react";
import Firebase from "firebase";
import MakePost from "./MakePost";
import ShowPost from "./ShowPost";

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
    return (
      <div>
        <MakePost userId="abcd" />
        {Object.keys(posts)
          .reverse()
          .map(postId => (
            <ShowPost postId={posts[postId]} key={postId} id={postId} />
          ))}
      </div>
    );
  }
}

export default NewsFeed;
