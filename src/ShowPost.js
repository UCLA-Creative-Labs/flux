import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './ShowPost.css';

class ShowPost extends Component {
  constructor(props, context) {
    super(props, context);
  }
  pseudofirebasecode() {
    //let lastPost = firebase.database.ref('posts').OrderByKey().limitToLast(8);
    /*
    return firebase.database().ref('/posts/' + numPosts - displayNum).once('value').then(function (snapshot) {
      var text = (snapshot.val() && snapshot.val().text) || '';
      var 
      */
  }
  render() {
    return (
      <div id="ShowPostContainer" >
        <h1>Post: {this.props.uid} {this.props.displayNum}</h1>
        <p>Timestamp here</p>
        <p>Post text/links here</p>
        <p>Photos here</p>
        <p># likes here</p>
      </div>
    );
  }
}
export default ShowPost;