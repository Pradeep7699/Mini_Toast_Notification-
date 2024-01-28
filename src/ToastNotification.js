import React, { useState, useEffect } from 'react';
import './ToastNotification.css';

const ToastNotification = ({ message, onClose, onMouseEnter, onMouseLeave }) => {
  const [timer, setTimer] = useState(7);

  useEffect(() => {
    const countdown = setInterval(() => {
      if (timer > 0) {
        setTimer((prevTimer) => prevTimer - 1);
      } else {
        clearInterval(countdown);
        onClose();
      }
    }, 1000);

    return () => clearInterval(countdown);
  }, [timer, onClose]);

  const handleMouseEnter = () => {
    clearInterval(timer);
  };

  const handleMouseLeave = () => {
    setTimer(7);
  };

  return (
    <div
      className="toast-notification"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span>{message}</span><span></span>
      <button onClick={onClose}>x</button>
      {/* <div className="timer">{timer}s</div> */}
    </div>
  );
};
export default ToastNotification

