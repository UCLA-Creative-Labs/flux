import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.js'
import Firebase, { FirebaseContext } from './Firebase';
import NewsFeed from './NewsFeed.js';
import * as serviceWorker from './serviceWorker';

/*ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <App />
  </FirebaseContext.Provider>
  , document.getElementById('root'));*/
ReactDOM.render(<NewsFeed />, document.getElementById('NewsFeed'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
