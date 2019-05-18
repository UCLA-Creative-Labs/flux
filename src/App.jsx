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
          time: "before the beginning of time"
        },
        {
          text: "is",
          color: "red",
          time: "before the beginning of time"
        },
        {
          text: "the",
          color: "orange",
          time: "before the beginning of time"
        },
        {
          text: "best",
          color: "yellow",
          time: "before the beginning of time"
        },
        {
          text: "you love milk",
          color: "green",
          time: "before the beginning of time"
        },
        {
          text: "C's get degrees",
          color: "blue",
          time: "before the beginning of time"
        },
        {
          text: "8clap",
          color: "indigo",
          time: "before the beginning of time"
        },
        {
          text: "i want to play pokemon go",
          color: "violet",
          time: "before the beginning of time"
        },
        {
          text: "image is a fb stickers",
          color: "brown",
          time: "before the beginning of time"
        },
        {
          text: "called yuttari dragon",
          color: "teal",
          time: "before the beginning of time"
        },
        {
          text: "its great but no one should see this",
          color: "pink",
          time: "before the beginning of time"
        },
        {
          text: "12th notification",
          color: "orange",
          time: "before the beginning of time"
        },
        {
          text: "hello there",
          color: "gray",
          time: "before the beginning of time"
        }
      ]
    };
  }

  makeNotification = (text, color, time) => {
    let array = this.state.notifications;
    array.unshift({
      text: text,
      color: color,
      time: time
    });
    this.setState({ notifications: array });
  };

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
          <Navbar userId={userId} />
          <Route exact path="/" render={() => <Redirect to="/newsfeed" />} />
          {/* Change to `userId="1234"` if testing */}
          <Route
            path="/newsfeed"
            render={() => (
              <NewsFeed
                makeNotification={makeNotification}
                userId={userId}
                type="home"
              />
            )}
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
