import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import firebaseWrapper from "./firebaseWrapper";
import ExpandedPost from "./components/NewsFeed/ExpandedPost";
import Login from "./components/Login";
import NewsFeed from "./components/NewsFeed/NewsFeed";
import MessageManager from "./components/MessageManager";
import ProfilePage from "./components/ProfilePage";
import Navbar from "./components/Navbar";
import NotificationPanel from "./components/NotificationPanel";
import ControlBlob from "./components/ControlBlob";
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
                  <NewsFeed
                    makeNotification={this.makeNotification}
                    userId={userId}
                    type="home"
                  />
                  <Navbar userId={userId} activeTab="home" />
                  <ControlBlob
                    userId={userId}
                    makeNotification={this.makeNotification}
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
            render={() => (
              <div>
                <Navbar userId={userId} activeTab="notifications" />
                <NotificationPanel notifications={notifications} />
              </div>
            )}
          />
          <Route path="/login" component={Login} />
          <Route path="/post" render={() => <NewsFeed userId="2468" />} />
          <Route path="/expand" render={() => <ExpandedPost />} />
        </Router>
      );
    }

    return <div className="App">{routes}</div>;
  }
}

export default App;
