import React, { Component } from "react";
import Firebase from "firebase";

import Example from "./components/example";
import ExampleFirebase from "./components/exampleFirebase";
import { firebaseConfig } from "./config/firebase";
import "./App.css";

class App extends Component {
  constructor() {
    super();

    if (!Firebase.apps.length) {
      Firebase.initializeApp(firebaseConfig);
    }

    this.state = {
      example: "this is a string acting as an example property"
      // db: firebase.database()
    };
  }

  render() {
    return (
      <div className="App">
        <Example example={this.state.example} />
        <ExampleFirebase />
      </div>
    );
  }
}

export default App;
