import React, { Component } from "react";
import "./NotificationBox.css";
import PropTypes from "prop-types";
class NotificationBox extends Component {
  render() {
    const { text } = this.props;
    const { color } = this.props;
    return (
      <div className="NotificationBox">
        <div className="color_type" style={{ backgroundColor: color }} />
        <div className="image" src="./image.png" />
        <p>{text}</p>
      </div>
    );
  }
}

NotificationBox.propTypes = {
  text: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired
};
export default NotificationBox;
