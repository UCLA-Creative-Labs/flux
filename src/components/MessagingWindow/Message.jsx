import React, { Component } from "react";
import posed from "react-pose";
import PropTypes from "prop-types";
import "../../colors.css";

const rb = require("../../images/ReceivedBubble.svg");
const sb = require("../../images/SentBubble.svg");

const Animate = posed.div({
  top: { y: 0, transition: { stiffness: 50, type: "spring" } },
  bottom: { y: "100vh" }
});

class Message extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mounted: false,
      offset: 0
    };
  }

  componentDidMount() {
    const randomOffset = Math.floor(Math.random() * 101);
    const randomTime = Math.random() * 2000;

    setTimeout(() => {
      this.setState({
        mounted: true,
        offset: randomOffset
      });
    }, randomTime);
  }

  render() {
    const { text, sent } = this.props;
    const { mounted, offset } = this.state;

    let styles = {
      sent: {
        backgroundImage: `url(${sb})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        left: `calc(${offset}% - 250px)` // 250px is size of bubble. change once dynamic
      },
      received: {
        backgroundImage: `url(${rb})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        left: `calc(${offset}% - 250px)` // 250px is size of bubble. change once dynamic
      }
    };

    if (offset < 50) {
      styles = {
        sent: {
          backgroundImage: `url(${sb})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          right: `calc(${offset}% + 250px)` // 250px is size of bubble. change once dynamic
        },
        received: {
          backgroundImage: `url(${rb})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          right: `calc(${offset}% + 250px)` // 250px is size of bubble. change once dynamic
        }
      };
    }

    const styling = sent ? styles.sent : styles.received;

    return (
      <Animate
        style={styling}
        className="message"
        pose={mounted ? "top" : "bottom"}
      >
        <p className="text-wrapper">{text}</p>
      </Animate>
    );
  }
}

Message.propTypes = {
  text: PropTypes.string.isRequired,
  sent: PropTypes.bool.isRequired
};

export default Message;
