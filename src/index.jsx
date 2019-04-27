import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
<<<<<<< HEAD

ReactDOM.render(<App />, document.getElementById("root"));
=======
import Firebase, { FirebaseContext } from "./Firebase";
import NewsFeed from "./NewsFeed.jsx";
/*ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <App />
  </FirebaseContext.Provider>
  , document.getElementById('root'));*/

ReactDOM.render(<App />, document.getElementById("root"));
ReactDOM.render(<NewsFeed />, document.getElementById("NewsFeed"));
>>>>>>> got config file to work but not firebase for showposts
