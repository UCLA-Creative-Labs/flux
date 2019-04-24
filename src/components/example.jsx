import React from "react";
import PropTypes from "prop-types";

const Example = ({ example }) => {
  return (
    <div>
      <p>{example}</p>
    </div>
  );
};

Example.propTypes = {
  example: PropTypes.string.isRequired
};

export default Example;
