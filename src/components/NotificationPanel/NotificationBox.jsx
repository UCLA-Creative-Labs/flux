import React from "react";
import "./NotificationBox.css";
import PropTypes from "prop-types";
import TabImage from "../../images/notifications/tab.png";
import PostImage from "../../images/notifications/post.png";
import MessageImage from "../../images/notifications/message.png";
import FriendImage from "../../images/notifications/friend.png";

function NotificationBox({ content, type, time }) {
  let color = "#D7F0F3"; // mint
  let image = TabImage;
  let text = content;
  if (type === "makePost") {
    color = "#7B90C6"; // navy
    image = PostImage;
    text = `You just made a new post!`;
  } else if (type === "message") {
    color = "#A0DDD9";
    image = MessageImage;
    text = `You just sent a message!`;
  } else if (type === "addFriend") {
    color = "#91AFFC";
    image = FriendImage;
    text = `You just added a friend!`;
  } else if (type === "clickTab") {
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
