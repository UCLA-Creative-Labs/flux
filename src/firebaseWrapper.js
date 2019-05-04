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
  const conversationRef = firebase
    .database()
    .ref(`/conversations/${conversationId}/messages/`);
  conversationRef.push(message);
};
// const getAllConversations = userId => {};
const listenForMessages = (conversationId, done) => {
  const conversationRef = firebase
    .database()
    .ref(`/conversations/${conversationId}/messages/`);
  conversationRef.on("value", snapshot => {
    done(snapshot.val());
  });
};

/**
 * Post Functions
 */
const sendPost = (userId, text, likes) => {
  const postref = Firebase.database().ref("posts");
  postref.push({
    userId,
    text,
    likes,
    timestamp: new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit"
    }).format(Date.now())
  });
};

const sendPostWithPhoto = (userId, text, likes, photo) => {
  const time = Date.now();
  const postref = Firebase.database().ref("posts");
  const storageref = Firebase.storage()
    .ref()
    .child(`users/${userId}${time}.jpg`);
  storageref.put(photo).then(() => {
    storageref.getDownloadURL().then(url => {
      const photoURL = url;
      postref.push({
        userId,
        text,
        photo: photoURL,
        likes,
        timestamp: new Intl.DateTimeFormat("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit"
        }).format(time),
        likedPosts: ["hello"]
      });
      this.setState({ text: "", photo: null, likes: 0 });
    });
  });
};

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
