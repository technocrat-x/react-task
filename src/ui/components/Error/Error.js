import React from "react";
import $ from "./Error.module.css"

const Error = ({ error }) => {
  return <div className={$.error} >{error}</div>;
};

export default Error;
