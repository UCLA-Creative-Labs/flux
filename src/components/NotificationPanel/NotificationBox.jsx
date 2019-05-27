import React, { Component } from "react";
import "./NotificationBox.css";
import PropTypes from "prop-types";
import PlaceholderImage from "../../images/notifications/placeholder.png";
import PostImage from "../../images/notifications/post.png";
/* const NotificationTypes = {
  makePost: {
    color: "blue",
    content: `${content} made a new post!`,
    image: PostImage
  }
}; */

class NotificationBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: `At ${new Date().toLocaleTimeString("en-GB")}, `,
      color: "orange",
      image: PlaceholderImage,
      text: "default notification"
    };
  }

  componentDidMount() {
    const { type, content } = this.props;
    if (type === "default") {
      this.setState({ text: content });
    } else if (type == "makePost") {
      this.setState({
        color: "blue",
        image: PostImage,
        text: `${content} made a new post!`
      });
    }
  }

  render() {
    const { color, image, time, text } = this.state;
    return (
      <div className="NotificationBox">
        <div className="color-type" style={{ backgroundColor: color }} />
        <img className="image" src={image} alt="Notification" />
        <p className="time">
          {time}
          <br />
          {text}
        </p>
      </div>
    );
  }
}

NotificationBox.propTypes = {
  content: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
};
export default NotificationBox;
