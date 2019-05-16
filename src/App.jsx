import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import firebaseWrapper from "./firebaseWrapper";

import Login from "./components/Login";
import MessagingWindow from "./components/MessagingWindow";
import "./App.css";
import NewsFeed from "./components/NewsFeed/NewsFeed";

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
        <Router>
          <Route
            path="/"
            exact
            render={() => (
              <MessagingWindow userId="31415" conversationId="asdf" />
            )}
          />
          <Route path="/login" component={Login} />
          <Route path="/post" render={() => <NewsFeed userId="2468" />} />
        </Router>
      </div>
    );
  }
}

export default App;
