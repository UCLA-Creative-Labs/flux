import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import firebaseWrapper from "./firebaseWrapper";
import Login from "./components/Login";
import Home from "./pages/Home";
import Messages from "./pages/Messages";
import Profile from "./pages/Profile";
import Loading from "./components/Loading";
import Registration from "./components/RegistrationPage/Registration";
import "./App.css";

class App extends Component {
  constructor() {
    super();

    this.state = {
      userId: "",
      notifications: []
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
          <Route path="/loading" component={Loading} />
          <Route
            path="/newsfeed"
            render={() => {
              return (
                <Home
                  userId={userId}
                  notifications={notifications}
                  makeNotification={this.makeNotification}
                />
              );
            }}
          />
          <Route
            path="/messages"
            exact
            render={() => {
              return <Messages userId={userId} notifications={notifications} />;
            }}
          />
          <Route
            path="/register"
            render={() => {
              return <Registration />;
            }}
          />
          <Route
            path="/user/:profileId"
            render={props => {
              return (
                <Profile
                  userId={userId}
                  notifications={notifications}
                  handleLogout={this.handleLogout}
                  {...props}
                />
              );
            }}
          />
        </Router>
      </div>
    );
  }
}

export default App;
