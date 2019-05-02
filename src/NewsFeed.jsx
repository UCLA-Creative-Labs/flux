import React, { Component } from "react";
import MakePost from "./MakePost.jsx";
import ShowPost from "./components/ShowPost.jsx";
import Firebase from "firebase";

let posts = {};
class NewsFeed extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      uid: 0,
      posts: {}
    };
  }

  componentDidMount() {
    let postRef = Firebase.database().ref("posts");
    postRef.on("value", snapshot => {
      console.log(snapshot.val());
      this.setState({
        posts: snapshot.val()
      });
      //console.log(this.state.posts);
    });
  }

  render() {
    return (
      <div>
        <MakePost userid="abcd" />
        {Object.keys(this.state.posts)
          .reverse()
          .map(post_id => (
            <ShowPost
              post_id={this.state.posts[post_id]}
              key={post_id}
              id={post_id}
            />
          ))}
      </div>
    );
  }
}

export default NewsFeed;
