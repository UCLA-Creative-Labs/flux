import React from "react";
import PropTypes from "prop-types";
import Step1 from "./step1";

const Register = ({ userId }) => {
  return (
    <div id="register">
      <Step1 userId={userId} />
    </div>
  );
};

Register.propTypes = {
  userId: PropTypes.string.isRequired
};

export default Register;
