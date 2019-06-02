import React, { Component } from "react";
import PropTypes from "prop-types";
import ExpandedPost from "./ExpandedPost";
import "./ExpandedPostModal.css";

class ExpandedPostModal extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      open: true
    };
  }

  componentDidMount() {
    const { open } = this.state;
    if (open) {
      document.body.style.overflow = "hidden";
    }
  }

  componentWillUnmount() {
    document.body.style.overflow = "unset";
  }

  render() {
    const { onClick, userId, text, photo } = this.props;
    return (
      <div className="expandedPostPopUp" onClick={onClick}>
        <span className="c2" />
        <span className="c3" />
        <span className="c1" />
        <span className="c4" />
        <span className="c6" />
        <span className="c5" />
        <div className="expandedPostPopup-inner">
          <ExpandedPost userId={userId} text={text} photo={photo} />
        </div>
      </div>
    );
  }
}

ExpandedPostModal.defaultProps = {
  photo: null
};

ExpandedPostModal.propTypes = {
  userId: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  photo: PropTypes.string
};

export default ExpandedPostModal;
