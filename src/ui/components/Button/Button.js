import React from "react";
import cx from "classnames";
import $ from "./Button.module.css";

const Button = ({
  children,
  onClick,
  type = "button",
  variant, // or 'secondary'
}) => {
  const buttonClass = cx($.button, {
    [$.primary]: variant === "primary",
    [$.secondary]: variant === "secondary",
  });
  return (
    <button
      // TODO: Add conditional classNames
      // - Must have a condition to set the '.primary' className
      // - Must have a condition to set the '.secondary' className
      className={buttonClass}
      type={type}
      onClick={onClick}
      variant={variant}
    >

      {children}
    </button>
  );
};

export default Button;