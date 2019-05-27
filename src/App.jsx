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
          type: "default",
          content: "flux"
        },
        {
          type: "makePost",
          content: "is"
        },
        {
          type: "default",
          content: "the"
        },
        {
          type: "default",
          content: "best"
        },
        {
          type: "default",
          content: "you love milk"
        },
        {
          type: "default",
          content: "C's get degrees"
        },
        {
          type: "default",
          content: "8clap"
        },
        {
          type: "default",
          content: "i want to play pokemon go"
        },
        {
          type: "default",
          content: "image is a fb stickers"
        },
        {
          type: "default",
          content: "called yuttari dragon"
        },
        {
          type: "default",
          content: "its great but no one should see this"
        },
        {
          type: "default",
          content: "12th notification"
        },
        {
          type: "default",
          content: "hello there"
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

  makeNotification = (type, content) => {
    const { notifications } = this.state;
    notifications.unshift({
      type,
      content
    });
    this.setState({ notifications });
  };

  render() {
    const { userId, notifications } = this.state;
    let routes;
    console.log(notifications);

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
        <button type="submit" onClick={this.handleLogout}>
          Logout
        </button>
        <button
          type="submit"
          onClick={() =>
            this.makeNotification("default", "default notification")
          }
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
