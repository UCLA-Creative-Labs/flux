import firebase from "firebase/app";
import { firebaseConfig } from "./config/firebase";

/**
 * Helper Functions
 */
const isInitialized = () => {
  return !(firebase.apps.length === 0);
};

/**
 * App Functions
 */
const initialize = () => {
  if (!isInitialized()) {
    firebase.initializeApp(firebaseConfig);
  }
};

/**
 * Auth Functions
 */
const listenForAuthStateChange = (onLogin, onLogout) => {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      onLogin(user);
    } else {
      onLogout();
    }
  });
};

const logout = () => {
  firebase.auth().signOut();
};

/**
 * Messaging Functions
 */
const sendMessage = (user, receiver, message) => {
  firebase
    .database()
    .ref(`users/${user}/friends/${receiver}/`)
    .on("value", snapshot => {
      const conversationId = snapshot.val();
      firebase
        .database()
        .ref(`/conversations/${conversationId}/messages/`)
        .push(message);
    });
};
//const getAllConversations = userId => {};
const listenForMessages = (updateMessages, user, receiver) => {
  const tempRef = firebase.database().ref(`users/${user}/friends/${receiver}/`);
  tempRef.once("value", snapshot1 => {
    const id = snapshot1.val();
    firebase
      .database()
      .ref(`/conversations/${id}/messages/`)
      .on("value", snapshot2 => {
        updateMessages(snapshot2.val());
      });
  });
};

/**
 * Post Functions
 */
// const sendPost = (userId, text, photo) => {};
// const getAllPosts = () => {};
// const listenForPosts = () => {};

/**
 * User Functions
 */
// const getAllFriends = () => {};

export default {
  initialize,
  listenForAuthStateChange,
  logout,
  sendMessage,
  // getAllConversations,
  listenForMessages
  // sendPost,
  // getAllPosts,
  // listenForPosts,
  // getAllFriends
};
