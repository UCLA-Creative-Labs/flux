import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './MakePost'
import MakePost from './MakePost';

class App extends Component {
  render() {
    return (
      <div className="App">
        <MakePost userid="Ryan" />
      </div>
    );
  }
}

export default App;
