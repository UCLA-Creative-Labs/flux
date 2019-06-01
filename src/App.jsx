import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import firebaseWrapper from "./firebaseWrapper";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import NotificationPanel from "./components/NotificationPanel";
import Home from "./pages/Home";
import Messages from "./pages/Messages";
import Profile from "./pages/Profile";
import "./App.css";

class App extends Component {
  constructor() {
    super();

    this.state = {
      userId: "",
      notifications: [
        {
          type: "default",
          content: "flux",
          time: "before the beginning of time"
        },
        {
          type: "makePost",
          content: "is",
          time: "before the beginning of time"
        },
        {
          type: "default",
          content: "the",
          time: "before the beginning of time"
        },
        {
          type: "default",
          content: "best",
          time: "before the beginning of time"
        },
        {
          type: "default",
          content: "you love milk",
          time: "before the beginning of time"
        },
        {
          type: "default",
          content: "C's get degrees",
          time: "before the beginning of time"
        },
        {
          type: "default",
          content: "8clap",
          time: "before the beginning of time"
        },
        {
          type: "default",
          content: "i want to play pokemon go",
          time: "before the beginning of time"
        },
        {
          type: "default",
          content: "image is a fb stickers",
          time: "before the beginning of time"
        },
        {
          type: "default",
          content: "called yuttari dragon",
          time: "before the beginning of time"
        },
        {
          type: "default",
          content: "its great but no one should see this",
          time: "before the beginning of time"
        },
        {
          type: "default",
          content: "12th notification",
          time: "before the beginning of time"
        },
        {
          type: "default",
          content: "hello there",
          time: "before the beginning of time"
        }
      ]
    };

    firebaseWrapper.initialize();
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

  redirectToRoot = () => {
    setTimeout(() => {
      const redirectLocation = window.location.href.match(/.*\/\/.*?\//)[0];
      window.location.replace(redirectLocation);
    }, 100);
  };

  handleLogout = event => {
    event.preventDefault();
    firebaseWrapper.logout();

    this.redirectToRoot();
  };

  makeNotification = (type, content) => {
    const { notifications } = this.state;
    const time = `At ${new Date().toLocaleTimeString("en-GB")}, `;
    notifications.unshift({
      type,
      content,
      time
    });
    this.setState({ notifications });
  };

  render() {
    const { userId, notifications } = this.state;

    if (userId === "") {
      return (
        <div className="App">
          <Router>
            <Switch>
              <Route exact path="/" component={Login} />
            </Switch>
          </Router>
        </div>
      );
    }

    return (
      <div className="App">
        <Router>
          <Route exact path="/" render={() => <Redirect to="/newsfeed" />} />
          <Route
            path="/newsfeed"
            render={() => {
              return (
                <Home
                  userId={userId}
                  makeNotification={this.makeNotification}
                />
              );
            }}
          />
          <Route
            path="/messages"
            exact
            render={() => {
              return <Messages userId={userId} />;
            }}
          />
          <Route
            path="/user/:profileId"
            render={props => {
              return (
                <Profile
                  userId={userId}
                  handleLogout={this.handleLogout}
                  {...props}
                />
              );
            }}
          />
          <Route
            path="/notificationpanel"
            exact
            render={() => (
              <div>
                <Navbar
                  userId={userId}
                  makeNotification={this.makeNotification}
                  activeTab="notifications"
                />
                <NotificationPanel notifications={notifications} />
              </div>
            )}
          />
        </Router>
      </div>
    );
  }
}

export default App;
