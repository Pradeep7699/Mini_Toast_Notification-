import React, { useState } from 'react';
import ToastNotification from './ToastNotification';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
export default function SecondComponent() {
  const [toasts, setToasts] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [customDuration, setCustomDuration] = useState(7);
  const [clickCounter, setClickCounter] = useState(0);

  const showToast = (message="Testing", duration = customDuration) => {
    console.log("showToast call1",message)

    if (message.trim() !== '') {

      console.log("showToast call2",message)
      const id = Date.now();
      setToasts((prevToasts) => [
        { id, message: message, duration: customDuration, remainingDuration: duration }, ...prevToasts
      ]);

      setTimeout(() => {
        closeToast(id);
      }, customDuration * 1000);
    }


    setInputValue("")
  };

  const closeToast = (id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
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

  const handleShowToast = () => {

    setClickCounter((prevCounter) => prevCounter + 1);
    showToast(`${inputValue==""?"Testing":inputValue} ${clickCounter + 1}`);
  };
  const handleConfirm = () => {
    // if(customDuration==7){
    //   alert("Please enter a timeout value")
    //   return 
    // }
    closeModal();
  };
  return (
    <div>
      <form style={{ display: 'flex', flexDirection: 'column', marginTop: '50px', marginLeft: '100px' }}>
        <label>Enter Custom Toast Text</label>
        <input
          type="text"
          id="customToast"
          placeholder="Enter here"
          value={inputValue}
          onChange={handleInputChange}
          style={{ marginBottom: '10px', width: '300px', borderRadius: '4px' ,height:"30px"}}
        />
        <button style={{ width: '300px' ,borderRadius: '4px' ,height:"30px"}} type="button" onClick={handleShowToast}>
          Show Custom Toast Message
        </button>
      </form>
      {/* Setting Icon Button */}
      <div style={{ width: "30px", height: "30px", marginTop: "-40px", marginLeft: "430px" }}>
        <button style={{ marginLeft: "10px" }} onClick={openModal}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/3524/3524659.png"
            alt="Setting"
            style={{ width: "30px", height: "30px", marginTop: "10px" }}
          />
        </button>
      </div>
      {/* Toast Notifications */}
      <div style={{ flex: 1, marginLeft: 780,marginTop:600 }}>
        {toasts.slice(-3).map((toast, index) => {
          console.log("toast===>", index, toast);

          return (
            <>
              {index < 3 ? (
                <div
                  style={{
                    marginTop: 10,
                    justifyContent: "center",
                    alignItems: "center",
                    flex: 1,
                    width: 200,
                  }}
                >
                  {/* <p>{JSON.stringify(toast)}</p> */}
                  <ToastNotification
                    key={toast.id}
                    message={toast.message}
                    onClose={() => closeToast(toast.id)}
                    onMouseEnter={() => clearInterval(toast.remainingDuration)}
                    onMouseLeave={() =>
                      showToast(toast.message, toast.remainingDuration)
                    }
                    customDuration={customDuration}
                  />
                </div>
              ) : null}
            </>
          );
        })}
      </div>
      {/* Modal */}
      {showModal && (
         <Dialog open={showModal} onClose={closeModal} maxWidth="md">
         <DialogTitle>
          
           <Button onClick={closeModal} style={{ float: 'right', padding: '0' }}>
             <CloseIcon />
           </Button>
         </DialogTitle>
        
         <DialogContent>
          Set Timeout:
           <input
             type="number"
             // label="Duration (seconds)"
            //  value={customDuration}
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
      )}
    </div>
  );
}
