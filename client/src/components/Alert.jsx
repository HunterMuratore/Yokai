import React, { useState, useEffect } from 'react';

function Alert({ message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // Set the duration in milliseconds (3 seconds in this example)

    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, [onClose]);

  return (
    <div className="alert">
      {message}
    </div>
  );
};

export default Alert