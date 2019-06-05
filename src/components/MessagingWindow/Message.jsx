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
    const { text } = this.props;
    this.state = {
      mounted: false,
      offset: 0,
      s: parseInt(Math.sqrt(text.length), 10) * 30
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
    const { s, mounted } = this.state;
    let { offset } = this.state;

    let styles = {
      sent: {
        backgroundImage: `url(${sb})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: `${s}px`,
        width: `${s}px`,
        left: `calc(${offset}% )`
      },
      received: {
        backgroundImage: `url(${rb})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: `${s}px`,
        width: `${s}px`,
        left: `calc(${offset}% )`
      }
    };

    if (offset > 50) {
      offset = 100 - offset;
      styles = {
        sent: {
          backgroundImage: `url(${sb})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          height: `${s}px`,
          width: `${s}px`,
          right: `calc(${offset}%)`
        },
        received: {
          backgroundImage: `url(${rb})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          height: `${s}px`,
          width: `${s}px`,
          right: `calc(${offset}% )`
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
