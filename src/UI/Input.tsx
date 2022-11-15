import React from "react";
import s from "./Input.module.scss";

interface InputProps {
  children?: React.ReactNode;

  [x: string]: any;
}
const Input: React.FC<InputProps> = ({ ...rest }) => {
  return <input className={s.input} {...rest} />;
};

export default Input;
