import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './ShowPost.css';

class ShowPost extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    let last8Posts = Firebase.database.ref("posts").OrderByKey().limitToLast(8); //get last 8 posts
    last8Posts.on("value", function (snapshot) {
      console.log(snapshot.val().post_id);
      console.log(snapshot.val().uid);
      console.log(snapshot.val().timestamp);
      console.log(snapshot.val().text);
      console.log(snapshot.val().photo);
      console.log(snapshot.val().likes);
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
    return (
      <div id="ShowPostContainer" >
        <h1>Post: post_id here</h1>
        <p>user_id here</p>
        <p>Timestamp here</p>
        <p>Post text/links here</p>
        <p>Photos here</p>
        <p># likes here</p>
      </div>
    );
  }
}
export default ShowPost;