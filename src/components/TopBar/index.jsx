import React, { Component } from "react";
import "./styles.css";
import PropTypes from "prop-types";

import firebaseWrapper from "../../firebaseWrapper";

import plus from "../../images/plus.svg";
import gear from "../../images/gear.svg";

class TopBar extends Component {
  constructor(props) {
    super(props);

    this.state = { postText: "", photo: null };
  }

  handleSearchBarChange = event => {
    this.setState({ postText: event.target.value });
  };

  onSearchBarKeyDown = event => {
    if (event.keyCode === 8) {
      event.preventDefault();

      const { userId, makeNotification } = this.props;
      const { postText, photo } = this.state;

      const resetState = () => {
        this.setState({ postText: "", photo: null });
      };

      makeNotification("makePost", `${userId}`);
      firebaseWrapper.sendPost(userId, postText, photo, resetState);
    }
  };

  render() {
    const { postText } = this.state;
    const { type } = this.props;
    return (
      <div className="topbar">
        {type === "message" ? (
          <h1 className="messageTitle">Direct Messages</h1>
        ) : null}
        {type === "home" ? (
          <input
            value={postText}
            className="search"
            placeholder="SEARCH"
            onChange={this.handleSearchBarChange}
            onKeyDown={this.onSearchBarKeyDown}
          />
        ) : null}
        <div className="plus">
          <img src={plus} alt="" />
        </div>
        <div className="questionmark">
          <span>?</span>
        </div>
        <div className="gear">
          <img src={gear} alt="" />
        </div>
        <button type="button" className="plusbutton" />
        <button type="button" className="qmarkbutton" />
        <button type="button" className="gearbutton" />
      </div>
    );
  }
}

TopBar.propTypes = {
  userId: PropTypes.string.isRequired,
  makeNotification: PropTypes.func.isRequired,
  type: PropTypes.oneOf(["home", "messages"]).isRequired
};

export default TopBar;
