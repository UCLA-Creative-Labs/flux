import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import NewsFeed from "./components/NewsFeed";

ReactDOM.render(<App />, document.getElementById("root"));
ReactDOM.render(<NewsFeed />, document.getElementById("NewsFeed"));
