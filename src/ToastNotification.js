import React, { useState, useEffect } from 'react';
import './ToastNotification.css';

const ToastNotification = ({ message, onClose, onMouseEnter, onMouseLeave,customDuration}) => {
  const [timer, setTimer] = useState(7);

  console.log("message",message)


  useEffect(() => {
    const countdown = setInterval(() => {
      if (timer > 0) {
        setTimer((prevTimer) => prevTimer - 1);
      } else {
        clearInterval(countdown);
        onClose();

      }
    }, customDuration*1000);

    return () => clearInterval(countdown);
  }, [timer, onClose,]);


  const handleMouseEnter = () => {

    console.log("handleMouseEnter calls")
    clearInterval(timer);
  };

  const handleMouseLeave = () => {
    setTimer(7);


  };

  return (
    <div
      className="toast-notification"
      onMouseEnter={()=>{
        handleMouseEnter()
        // console.log("enter mouse calls")
      }}
      onMouseLeave={handleMouseLeave}
    >
      <span>{message}</span>
      <button onClick={onClose}>x</button>
    </div>
  );
};

export default ToastNotification;
