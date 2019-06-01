import React, { Component } from "react";
import Logo from "../../images/Loading/logo-black.png";
import "./styles.css";

class Loading extends Component {
  constructor() {
    super();
    this.state = {
      value: 10
    };
  }

  componentDidMount() {
    setInterval(() => {
      this.setState(state => {
        return {
          value: state.value + Math.floor(Math.random() * 11) - 2
        };
      });
    }, 1000);
  }

  redirectToRoot = () => {
    const redirectLocation = window.location.href.match(/.*\/\/.*?\//)[0];
    window.location.replace(redirectLocation);
  };

  handleChange = event => {
    const value = parseInt(event.target.value);

    if (value === 100) {
      this.redirectToRoot();
    }

    this.setState({ value });
  };

  render() {
    const { value } = this.state;

    return (
      <div className="loading">
        <div className="loading-bar">
          <img src={Logo} />
          <input
            type="range"
            min="1"
            max="100"
            value={value}
            onChange={this.handleChange}
          />
          <p>{value}%</p>
          <h1>LOADING</h1>
        </div>
      </div>
    );
  }
}

export default Loading;
