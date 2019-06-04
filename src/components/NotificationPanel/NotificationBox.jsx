import React from "react";
import "./NotificationBox.css";
import PropTypes from "prop-types";
import OtherImage from "../../images/notifications/other.png";
import PostImage from "../../images/notifications/post.png";
import MessageImage from "../../images/notifications/message.png";
import FriendImage from "../../images/notifications/friend.png";

function NotificationBox({ content, type, time }) {
  let color = "#D7F0F3"; // mint
  let image = OtherImage;
  let text = content;
  if (type === "makePost") {
    color = "#7B90C6"; // navy
    image = PostImage;
    text = `${text} made a new post!`;
  } else if (type === "message") {
    color = "teal";
    image = MessageImage;
    text = `${text} just messaged you!`;
  } else if (type === "addFriend") {
    color = "blue";
    image = FriendImage;
    text = `${text} just friended you!`;
  } else if (type == "clickTab") {
    text = "You just clicked a tab!";
  }
  const BoxColor = {
    borderLeft: `10px solid ${color}`
  };
  return (
    <div className="NotificationBox" style={BoxColor}>
      <img className="image" src={image} alt="Notification" />
      <p className="content">
        {time}
        <br />
        {text}
      </p>
    </div>
  );
}

NotificationBox.propTypes = {
  content: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired
};
export default NotificationBox;
