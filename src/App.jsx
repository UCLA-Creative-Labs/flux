import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import firebaseWrapper from "./firebaseWrapper";

import Login from "./components/Login";
import MessagingWindow from "./components/MessagingWindow";
import "./App.css";

class App extends Component {
  constructor() {
    super();

    firebaseWrapper.initialize();

    this.state = {
      userId: ""
    };
  }

  componentDidMount() {
    const onLogin = user => {
      this.setState({ userId: user.uid });
    };
    const onLogout = () => {
      this.setState({ userId: "" });
    };

    firebaseWrapper.listenForAuthStateChange(onLogin, onLogout);
  }

  handleLogout = event => {
    event.preventDefault();
    firebaseWrapper.logout();
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
          <Route path="/post" render={() => <MakePost userid="Ryan" />} />
        </Router>
      </div>
    );
  }
}

export default App;
