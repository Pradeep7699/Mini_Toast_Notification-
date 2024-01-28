import React, { useState } from 'react';
import ToastNotification from './ToastNotification';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

export default function FirstComponent() {
  const [toasts, setToasts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [customDuration, setCustomDuration] = useState(7);

  console.log("customDuration",customDuration)
  const showToast = (message, duration = customDuration) => {
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

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleDurationChange = (e) => {
    setCustomDuration(parseInt(e.target.value));
  };

  const handleConfirm = () => {
    closeModal();
  };

  return (
    <div>
      <button style={{ height: "40px", marginTop: "70px", marginLeft: "30px" }} onClick={() => showToast('Default Message')}>
        Show Toast Message
      </button>
      {/* Setting Icon Button */}
      <div style={{ width: "30px", height: "30px", marginTop: "-45px", marginLeft: "170px" }}>
        <button style={{ marginLeft: "10px" }} onClick={openModal}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/3524/3524659.png"
            alt="Setting"
            style={{ width: "30px", height: "30px", marginTop: "10px" }}
          />
        </button>
      </div>
      {/* Toast Notifications */}
      <div className="toast-container">
        {toasts.map((toast) => (
          <ToastNotification
            key={toast.id}
            message={toast.message}
            onClose={() => closeToast(toast.id)}
            onMouseEnter={() => clearInterval(toast.remainingDuration)}
            onMouseLeave={() => showToast(toast.message, toast.remainingDuration)}
          />
        ))}
      </div>
      {/* Material UI Modal */}
      <Dialog open={showModal} onClose={closeModal} maxWidth="md">
        <DialogTitle>
         
          <Button onClick={closeModal} style={{ float: 'right', padding: '0' }}>
            <CloseIcon />
          </Button>
        </DialogTitle>
       
        <DialogContent>
        {/* <div style={{ marginLeft: '1px' }}> */}
           Set Timeout:
             {/* </div> */}
          <input
            type="number"
            // value={customDuration}
            onChange={handleDurationChange}
            style={{width:"180px"}}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirm} color="primary">
            Confirm
          </Button>
        </DialogActions>
      
      </Dialog>
    </div>
  );
}
