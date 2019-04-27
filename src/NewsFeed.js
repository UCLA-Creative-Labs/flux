import React, { Component } from "react";
import ReactDOM from "react-dom";
import MakePost from "./MakePost.jsx";
import ShowPost from "./ShowPost.js";

class NewsFeed extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      uid: 0,
      displayNum: 0,
      numPosts: 4
    };
  }
  render() {
    return (
      <div>
        <MakePost userid="abcd" />
        <ShowPost uid={this.state.uid} displayNum={this.state.displayNum} />
        <ShowPost uid={this.state.uid} displayNum={this.state.displayNum + 1} />
        <ShowPost uid={this.state.uid} displayNum={this.state.displayNum + 2} />
        <ShowPost uid={this.state.uid} displayNum={this.state.displayNum + 3} />
      </div>
    );
  }
}
export default NewsFeed;
