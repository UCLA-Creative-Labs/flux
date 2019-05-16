import firebase from "firebase/app";
import { firebaseConfig } from "./config/firebase";

/**
 * Helper Functions
 */
const isInitialized = () => {
  return !(firebase.apps.length === 0);
};

const uploadPost = (userId, text, photoUrl, time) => {
  const postsRef = firebase.database().ref("posts");

  const post = {
    userId,
    text,
    likes: 0,
    timestamp: new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit"
    }).format(time)
  };
  if (photoUrl !== null) {
    post.photo = photoUrl;
  }

  return postsRef.push(post);
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

const listenForMessages = (prevRef, conversationId, done) => {
  if (prevRef !== null && prevRef !== undefined) {
    prevRef.off();
  }
  const conversationRef = firebase
    .database()
    .ref(`/conversations/${conversationId}/messages/`);
  conversationRef.on("value", snapshot => {
    done(snapshot.val(), conversationRef);
  });
};

/**
 * Post Functions
 */
const sendPost = (userId, text, photo, done) => {
  const time = Date.now();

  if (photo !== null) {
    const storageRef = firebase
      .storage()
      .ref()
      .child(`users/${userId}${time}.jpg`);
    storageRef.put(photo).then(() => {
      storageRef.getDownloadURL().then(photoUrl => {
        uploadPost(userId, text, photoUrl, time).then(done);
      });
    });
  } else {
    uploadPost(userId, text, photo, time).then(done);
  }
};

const listenForPosts = done => {
  const postsRef = firebase.database().ref("posts");

  postsRef.on("value", snapshot => {
    done(snapshot.val());
  });
};

const incrementLike = (likes, postId, userId) => {
  const postsRef = firebase.database().ref("posts");
  const likedPostsRef = firebase
    .database()
    .ref("users")
    .child(userId)
    .child("/likedPosts");

  let alreadyLiked = false;
  likedPostsRef.once("value", snapshot => {
    snapshot.forEach(childSnapshot => {
      if (childSnapshot.val() === postId) {
        alreadyLiked = true;
      }
    });
    if (alreadyLiked === false) {
      likedPostsRef.push(postId);
      postsRef.child(postId).update({ likes: likes + 1 });
    }
  });
};

/**
 * User Functions
 */
const getFriends = (userId, done) => {
  const friendsRef = firebase.database().ref(`users/${userId}/friends/`); // reference to friends
  friendsRef.on("value", snapshot => {
    let friends = snapshot.val();

    if (friends === null) {
      friends = {};
    }
    done(friends);
  });
};
// const getUserPosts = (userId, done) => {};
// const getLikedPosts = (userId, done) => {};

export default {
  initialize,
  listenForAuthStateChange,
  logout,

  sendMessage,
  listenForMessages,

  sendPost,
  listenForPosts,
  incrementLike,

  getFriends
  // getUserPosts,
  // getLikedPosts
};
