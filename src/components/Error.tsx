import React from "react";

const Error: React.FC<{ title: string; message?: string }> = ({
  title,
  message,
}) => {
  return (
    <div className="text-center">
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
};

export default Error;