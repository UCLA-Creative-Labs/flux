import React, { Component } from "react";
import firebase from "firebase";
import firebaseui from "firebaseui";

class Login extends Component {
  componentDidMount() {
    const uiConfig = {
      signInSuccessUrl: "/",
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID
      ]
    };

    const ui = new firebaseui.auth.AuthUI(firebase.auth());
    ui.start("#firebaseui-auth-container", uiConfig);
  }

  render() {
    return (
      <div>
        <h1>Login Page</h1>
        <div id="firebaseui-auth-container" />
      </div>
    );
  }
}

export default Login;
