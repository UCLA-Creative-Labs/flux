import React, { Component } from "react";
import Firebase from "firebase";

import { firebaseConfig } from "./config/firebase";
import "./App.css";
import MessagingWindow from "./components/MessagingWindow/MessagingWindow";

class App extends Component {
  constructor() {
    super();

    if (!Firebase.apps.length) {
      Firebase.initializeApp(firebaseConfig);
    }

  }

  render() {
    return (
      <div className="App">
        <MessagingWindow user="1234" receiver="9876" /> {/* For testing! */}
      </div>
    );
  }
}

export default App;
