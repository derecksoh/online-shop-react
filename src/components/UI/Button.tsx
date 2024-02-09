import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  textOnly?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  children,
  textOnly,
  className,
  ...props
}) => {
  let cssClasses = textOnly
    ? "cursor-pointer bg-transparent border-none text-orange-400 hover:text-orange-600 active:text-orange-600"
    : "cursor-pointer bg-yellow-500 border-1 border-amber-600 text-stone-900 py-2 px-6 border-[50%]" +
      " hover:bg-yellow-600 hover:border-amber-700 hover:text-stone-700";
  cssClasses += " " + className;

  return (
    <button className={cssClasses} {...props}>
      {children}
    </button>
  );
};

export default Button;
