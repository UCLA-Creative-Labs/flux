import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import firebase from "firebase";

import { firebaseConfig } from "./config/firebase";
import Login from "./components/Login";
import MessagingWindow from "./components/MessagingWindow";
import "./App.css";

class App extends Component {
  constructor() {
    super();

    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    this.state = {
      userId: ""
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ userId: user.uid });
      } else {
        this.setState({ userId: "" });
      }
    });
  }

  handleLogout = event => {
    event.preventDefault();
    firebase.auth().signOut();
  };

  render() {
    const { userId } = this.state;

    return (
      <div className="App">
        <button type="submit" onClick={this.handleLogout}>
          Logout
        </button>
        <p>You userId is {userId}</p>

        <Router>
          <Route
            path="/"
            exact
            render={() => <MessagingWindow user="1234" receiver="9876" />}
          />
          <Route path="/login" component={Login} />
        </Router>
      </div>
    );
  }
}

export default App;
