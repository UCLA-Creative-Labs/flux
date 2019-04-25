import React, { Component } from "react";
import Firebase from "firebase";

class ExampleFirebase extends Component {
  constructor() {
    super();

    this.testsRef = Firebase.database().ref("tests");

    this.state = {
      posts: {},
      text: ""
    };
  }

  componentDidMount() {
    this.testsRef.on("value", snapshot => {
      this.setState({
        posts: snapshot.val()
      });
    });
  }

  handleChange = e => {
    this.setState({ text: e.target.value });
  };

  handleClick = e => {
    e.preventDefault();

    const { text } = this.state;

    this.testsRef.push(text);
    this.setState({
      text: ""
    });
  };

  render() {
    const { text, posts } = this.state;

    return (
      <div>
        <h1>Firebase Example</h1>
        <form>
          <input type="text" onChange={this.handleChange} value={text} />
          <button onClick={this.handleClick} type="submit">
            button
          </button>
        </form>

        <h2>Posts</h2>
        {Object.keys(posts).map(key => (
          <p key={key}>{posts[key]}</p>
        ))}
      </div>
    );
  }
}

export default ExampleFirebase;
