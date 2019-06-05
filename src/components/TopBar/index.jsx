import React, { Component } from "react";
import "./styles.css";
import PropTypes from "prop-types";
import firebaseWrapper from "../../firebaseWrapper";

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
    const { type, handleLogout } = this.props;
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
        {type === "profile" ? <button type="button" className="plus" /> : null}
        <button type="button" className="questionmark" />
        <button type="button" className="gear" onClick={handleLogout} />
      </div>
    );
  }
}

TopBar.defaultProps = {
  makeNotification: null
};

TopBar.propTypes = {
  userId: PropTypes.string.isRequired,
  makeNotification: PropTypes.func,
  type: PropTypes.oneOf(["home", "message", "profile"]).isRequired,
  handleLogout: PropTypes.func.isRequired
};

export default TopBar;
