import React, { Component } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import firebaseWrapper from "./firebaseWrapper";

import Login from "./components/Login";
import NewsFeed from "./components/NewsFeed";
import MessageManager from "./components/MessageManager";
import ProfilePage from "./components/ProfilePage";
import Navbar from "./components/Navbar";
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
        <p>Your userId is {userId}</p>

        <Router>
          {userId !== "" && <Navbar userId={userId} />}

          <Route
            path="/"
            exact
            render={() =>
              userId === "" ? <Login /> : <Redirect to="/newsfeed" />
            }
          />

          {/* Change to `userId="1234"` if testing */}
          <Route
            path="/newsfeed"
            render={() => <NewsFeed userId={userId} type="home" />}
          />
          <Route
            path="/messages"
            exact
            render={() => <MessageManager userId={userId} />}
          />
          <Route
            path="/user/:profileId"
            render={props => <ProfilePage userId={userId} {...props} />}
          />
        </Router>
      </div>
    );
  }
}

export default App;
