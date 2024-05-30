import React from "react";
// import cx from "classnames";

import $ from "./Button.module.css";

const Button = ({
  children,
  onClick,
  type = "button",

  variant = "primary",
}) => {
  let buttonClass = $.button;
  if (variant === "primary") {
    buttonClass += ` ${$.primary}`;
  } else if (variant === "secondary") {
    buttonClass += ` ${$.secondary}`;
  } else if (variant === "clear") {
    buttonClass += ` ${$.clear}`;
  }
  return (
    <button
      // TODO: Add conditional classNames
      // - Must have a condition to set the '.primary' className
      // - Must have a condition to set the '.secondary' className
      className={buttonClass}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
