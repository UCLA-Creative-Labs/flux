import React, { Component } from "react";
import Example from "./components/example";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      example: "this is a string acting as an example property"
    };
  }

  render() {
    return (
      <div className="App">
        <Example example={this.state.example} />
      </div>
    );
  }
}

export default App;
