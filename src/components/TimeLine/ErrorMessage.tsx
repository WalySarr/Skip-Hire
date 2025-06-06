import React from "react";

interface ErrorProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorProps> = ({ message }) => (
  <div className="error-container">
    <div className="error-icon">!</div>
    <p>{message}</p>
    <button onClick={() => window.location.reload()}>Try Again</button>
  </div>
);

export default ErrorMessage;
