import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
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

    setTimeout(() => {
      const redirectLocation = window.location.href.match(/.*\/\/.*?\//)[0];
      window.location.replace(redirectLocation);
    }, 100);
  };

  render() {
    const { userId } = this.state;

    let routes;

    if (userId === "") {
      routes = (
        <Router>
          <Switch>
            <Route exact path="/" component={Login} />
          </Switch>
        </Router>
      );
    } else {
      routes = (
        <Router>
          <Route exact path="/" render={() => <Redirect to="/newsfeed" />} />
          {/* Change to `userId="1234"` if testing */}
          <Route
            path="/newsfeed"
            render={() => {
              return (
                <div>
                  <Navbar userId={userId} activeTab="home" />
                  <NewsFeed userId={userId} type="home" />
                </div>
              );
            }}
          />
          <Route
            path="/messages"
            exact
            render={() => {
              return (
                <div>
                  <Navbar userId={userId} activeTab="messages" />
                  <MessageManager userId={userId} />
                </div>
              );
            }}
          />
          <Route
            path="/user/:profileId"
            render={props => {
              return (
                <div>
                  <Navbar userId={userId} activeTab="profile" />
                  <ProfilePage
                    userId={userId}
                    handleLogout={this.handleLogout}
                    {...props}
                  />
                </div>
              );
            }}
          />
          <Route path="/login" component={Login}/>
          <Route
            path="/user/:profileId"
            render={props => <ProfilePage userId="31415" {...props} />}
          />
        </Router>
      );
    }

    return (
      <div className="App">
        <p>Your userId is {userId}</p>

        {routes}
      </div>
    );
  }
}

export default App;
