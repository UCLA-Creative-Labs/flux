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
const sendMessage = (conversationId, message) => {
    const conversationRef = firebase.database().ref(`/conversations/${conversationId}/messages/`);
    conversationRef.push(message);
}
// const getAllConversations = userId => {};
const listenForMessages = (conversationId, done) => {
    const conversationRef = firebase.database().ref(`/conversations/${conversationId}/messages/`);
    conversationRef.on("value", snapshot => {
        done(snapshot.val());
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
