import React, { useState, useEffect } from 'react';
import './ToastNotification.css';

const ToastNotification = ({id, message, onClose, onMouseEnter, onMouseLeave,customDuration}) => {
  const [timer, setTimer] = useState(7);
  const [queue, setQueue] = useState([]);
  console.log("queue",queue)
  console.log("key11",id,message)


  useEffect(() => {
    const countdown = setInterval(() => {
      if (timer > 0) {
        setTimer((prevTimer) => prevTimer - 1);
      } else {
        clearInterval(countdown);
        onClose();

        if (queue.length > 0) {
          // Display the next message in the queue
          const nextMessage = queue.shift();
          setQueue([...queue]); // Update the queue

          // Show the next message
          setTimeout(() => {
            displayToast(nextMessage);
          }, customDuration*1000);
        }
      }
    }, customDuration*1000);

    return () => clearInterval(countdown);
  }, [timer, onClose, queue]);

  const displayToast = (nextMessage) => {
    setTimer(7);
    setQueue((prevQueue) => [...prevQueue, nextMessage]);
  };

  const handleMouseEnter = () => {

    console.log("handleMouseEnter calls",id)
    clearInterval(timer);
    // stop(id)
  };

  const handleMouseLeave = () => {
    setTimer(7);
    // stop(null)
    // closeToast(id)

  };

  return (
    <div
      className="toast-notification"
      onMouseEnter={()=>{
        handleMouseEnter()
        console.log("enter mouse calls")
      }}
      onMouseLeave={handleMouseLeave}
    >
      <span>{message}</span>
      <button onClick={onClose}>x</button>
{/* 
      {queue.slice(-3).map((queuedMessage, index) => (
        <div key={index}>{queuedMessage}</div>
      ))} */}
    </div>
  );
};

export default ToastNotification;
