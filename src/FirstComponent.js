import React, { useState } from "react";
import ToastNotification from "./ToastNotification";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

export default function FirstComponent() {
  const [toasts, setToasts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [customDuration, setCustomDuration] = useState(7);
  const [clickCounter, setClickCounter] = useState(0);
  const [selectedID, setselectedID] = useState(null);

  const showToast = (message, duration = customDuration) => {
    const id = Date.now();

    console.log("id", id);
    setToasts((prevToasts) => [
      { id, message, duration, remainingDuration: duration },
      ...prevToasts,
    ]);

    setTimeout(() => {
      closeToast(id);
    }, duration * 1000);
  };

  const closeToast = (id) => {
    // console.log("selectedID:", selectedID, "id", id);
    // if (selectedID == id) {
    //   return;
    // }
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
    //   if(customDuration==''){
    //   alert("Please enter a timeout value")
    //   return 
    // }
    closeModal();
  };

  const handleShowToast = () => {
    setClickCounter((prevCounter) => prevCounter + 1);
    showToast(`Message ${clickCounter + 1}`);
  };

  //   const stop = (id) => {
  //     console.log("stop call ",id)
  // setselectedID(id)  };

  return (
    <div>
      <button
        style={{ height: "40px", marginTop: "70px", marginLeft: "30px" }}
        onClick={handleShowToast}
      >
        Show Toast Message
      </button>
      {/* Setting Icon Button */}
      <div
        style={{
          width: "30px",
          height: "30px",
          marginTop: "-45px",
          marginLeft: "170px",
        }}
      >
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
      {/* Material UI Modal */}
      <Dialog open={showModal} onClose={closeModal} maxWidth="md">
        <DialogTitle>
          <Button onClick={closeModal} style={{ float: "right", padding: "0" }}>
            <CloseIcon />
          </Button>
        </DialogTitle>
        <DialogContent>
          Set Timeout:
          <input
            type="number"
            onChange={handleDurationChange}
            style={{ width: "180px" }}
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
