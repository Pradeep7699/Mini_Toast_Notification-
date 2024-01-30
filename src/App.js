import React, { useState } from 'react';
import ToastNotification from './ToastNotification';
import Routes from './Navigation/Routes';

const App = () => {
  
  const [toasts, setToasts] = useState([]);

  const showToast = (message, duration = 7) => {
    const id = Date.now();
    setToasts((prevToasts) => [
      ...prevToasts,
      { id, message, duration, remainingDuration: duration },
    ]);

    setTimeout(() => {
      closeToast(id);
    }, duration * 1000);
  };

  const closeToast = (id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };



  

  return (
    <div>
      
      <div style={{backgroundColor:"maroon",height:"55px",marginTop:"-20px"}}>
          <p style={{fontSize:"20px",textAlign:"left",color:"white"}}>Header</p> 
      </div>
        <Routes/>
    <div style={{backgroundColor:"grey",height:"55px",marginTop:"540px"}}>
         <p style={{fontSize:"20px",textAlign:"center"}}>Footer</p> 
      </div>

    </div>
  );
};

export default App;