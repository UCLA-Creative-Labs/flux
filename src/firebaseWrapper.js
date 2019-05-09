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

const fetchMessages = (conversationId, done) => {
  const conversationRef = firebase
    .database()
    .ref(`/conversations/${conversationId}/messages/`);
  conversationRef.once("value", snapshot => {
    done(snapshot.val());
  });
};

const fetchFriends = (userId, done) => {
  const friendsRef = firebase.database().ref(`users/${userId}/friends/`); // reference to friends
  friendsRef.on("value", snapshot => {
    console.log(snapshot.val());
    done(snapshot.val());
  });
};

/**
 * Post Functions
 */

const sendPost = (userId, text, photo, done) => {
  const postref = firebase.database().ref("posts");
  if (photo !== null) {
    const time = Date.now();
    const storageref = firebase
      .storage()
      .ref()
      .child(`users/${userId}${time}.jpg`);
    storageref.put(photo).then(() => {
      storageref.getDownloadURL().then(url => {
        const photoURL = url;
        postref.push({
          userId,
          text,
          photo: photoURL,
          likes: 0,
          timestamp: new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit"
          }).format(time)
        });
        done();
      });
    });
  } else {
    postref.push({
      userId,
      text,
      likes: 0,
      timestamp: new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
      }).format(Date.now())
    });
    done();
  }
};
/**
 * Increment Likes Function
 */
const incrementLike = (likes, postId, userId) => {
  const newLikes = likes + 1;
  const likedPosts = firebase
    .database()
    .ref("users")
    .child(userId)
    .child("/likedPosts");

  let alreadyLiked = false;
  likedPosts.once("value", function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      if (childSnapshot.val() === postId) {
        alreadyLiked = true;
      }
    });
    if (alreadyLiked === false) {
      likedPosts.push(postId);
      firebase
        .database()
        .ref("posts")
        .child(postId)
        .update({ likes: newLikes });
    }
  });
};
/*
const sendPost = (userId, text, likes) => {
  const postref = firebase.database().ref("posts");
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

const sendPostWithPhoto = (userId, text, likes, photo, done) => {
  const time = Date.now();
  const postref = firebase.database().ref("posts");
  const storageref = firebase
    .storage()
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
      done();
    });
  });
};
*/

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
  incrementLike,
  // getAllConversations,
  listenForMessages,
  fetchMessages,
  fetchFriends,
  sendPost
  // getAllPosts,
  // listenForPosts,
  // getAllFriends
};
