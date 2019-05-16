import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import firebaseWrapper from "./firebaseWrapper";

import Login from "./components/Login";
import NewsFeed from "./components/NewsFeed";
import MessageManager from "./components/MessageManager";
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
        <button type="submit" onClick={this.handleLogout}>
          Logout
        </button>
        <p>Your userId is {userId}</p>

        <Router>
          <Route path="/" exact component={Login} />
          {/* Change to `userId="1234"` if testing */}
          <Route path="/newsfeed" render={() => <NewsFeed userId={userId} />} />
          <Route
            path="/messages"
            exact
            render={() => <MessageManager userId={userId} />}
          />
          <Route path="/login" component={Login} />
          <Route path="/post" render={() => <NewsFeed userId="2468" />} />
        </Router>
      </div>
    );
  }
}

export default App;
