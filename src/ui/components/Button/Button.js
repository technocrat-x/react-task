import React from "react";
import cx from "classnames";

import $ from "./Button.module.css";

const Button = ({
  children,
  onClick,
  type = "button",
  variant,
}) => {
  return (
    <button
      // TODO: Add conditional classNames
      // - Must have a condition to set the '.primary' className
      // - Must have a condition to set the '.secondary' className
      // Completed^

      className={cx($.button, {
        [$.primary]: variant === "primary",
        [$.secondary]: variant === "secondary",
      })}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
