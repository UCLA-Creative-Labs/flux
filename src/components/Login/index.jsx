import React, { Component } from "react";
import firebase from "firebase";
import firebaseui from "firebaseui";
import "./styles.css";

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

    const ui =
      firebaseui.auth.AuthUI.getInstance() ||
      new firebaseui.auth.AuthUI(firebase.auth());
    ui.start("#firebaseui-auth-container", uiConfig);
  }

  render() {
      console.log(this.props.match.params);
    return (
      <div id="login-page">
        <div className="card">
          <h1>FLUX</h1>
          <div id="firebaseui-auth-container" />
        </div>
      </div>
    );
  }
}

export default Login;
