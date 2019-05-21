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
import NotificationPanel from "./components/NotificationPanel";
import "./App.css";

class App extends Component {
  constructor() {
    super();

    firebaseWrapper.initialize();

    this.state = {
      userId: "",
      notifications: [
        {
          text: "flux",
          color: "aqua",
          time: "before the beginning of time",
          image: "./placeholder.png"
        },
        {
          text: "is",
          color: "red",
          time: "before the beginning of time",
          image: "./post.png"
        },
        {
          text: "the",
          color: "orange",
          time: "before the beginning of time",
          image: "./placeholder.png"
        },
        {
          text: "best",
          color: "yellow",
          time: "before the beginning of time",
          image: "./placeholder.png"
        },
        {
          text: "you love milk",
          color: "green",
          time: "before the beginning of time",
          image: "./placeholder.png"
        },
        {
          text: "C's get degrees",
          color: "blue",
          time: "before the beginning of time",
          image: "./placeholder.png"
        },
        {
          text: "8clap",
          color: "indigo",
          time: "before the beginning of time",
          image: "./placeholder.png"
        },
        {
          text: "i want to play pokemon go",
          color: "violet",
          time: "before the beginning of time",
          image: "./placeholder.png"
        },
        {
          text: "image is a fb stickers",
          color: "brown",
          time: "before the beginning of time",
          image: "./placeholder.png"
        },
        {
          text: "called yuttari dragon",
          color: "teal",
          time: "before the beginning of time",
          image: "./placeholder.png"
        },
        {
          text: "its great but no one should see this",
          color: "pink",
          time: "before the beginning of time",
          image: "./placeholder.png"
        },
        {
          text: "12th notification",
          color: "orange",
          time: "before the beginning of time",
          image: "./placeholder.png"
        },
        {
          text: "hello there",
          color: "gray",
          time: "before the beginning of time",
          image: "./placeholder.png"
        }
      ]
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

  makeNotification = (text, color, time, image) => {
    const array = this.state.notifications;
    array.unshift({
      text: text,
      color: color,
      time: time,
      image: image
    });
    this.setState({ notifications: array });
  };

  render() {
    const { userId, notifications } = this.state;
    const makeNotification = this.makeNotification;
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
                  <NewsFeed
                    makeNotification={makeNotification}
                    userId={userId}
                    type="home"
                  />
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
          <Route
            path="/notificationpanel"
            exact
            render={() => <NotificationPanel notifications={notifications} />}
          />
        </Router>
      );
    }

    return (
      <div className="App">
        <div id="overlay" />
        <button type="submit" onClick={this.handleLogout}>
          Logout
        </button>
        <button
          type="submit"
          onClick={() => this.makeNotification("random", "orange")}
        >
          make a notification
        </button>
        <p>Your userId is {userId}</p>
        {routes}
      </div>
    );
  }
}

export default App;
