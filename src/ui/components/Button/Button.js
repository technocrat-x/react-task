import React from "react";
import cx from "classnames";

import $ from "./Button.module.css";

const Button = ({
  children,
  // zipCode,
  onClick,
  type = "button",
  variant = "primary", // or 'secondary'
  disabled = false,
}) => {
  return (
    <button
      // TODO: Add conditional classNames
      // - Must have a condition to set the '.primary' className
      // - Must have a condition to set the '.secondary' className
      className={cx($.button, {
        [$.secondary]: variant === "secondary",
      })}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
