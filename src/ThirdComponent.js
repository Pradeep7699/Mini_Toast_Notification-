import React, { useState, useEffect } from "react";
import ToastNotification from "./ToastNotification";

export default function ThirdComponent() {
  const [toasts, setToasts] = useState([]);
  const [remainingSeconds, setRemainingSeconds] = useState();
  const [countdowntime, setcountdowntime] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  // const [countrylist, setcountrylist] = useState([]);
  const [countries, setCountries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const countriesPerPage = 5;

  const showToast = (message, duration) => {
    console.log("message", message, duration);
    const id = Date.now();
    setToasts((prevToasts) => [
      ...prevToasts,
      { id, message, remainingDuration: duration },
    ]);

    setTimeout(() => {
      closeToast(id);
    }, duration * 1000);
  };

  const closeToast = (id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  // Calculate the indexes of the first and last countries on the current page
  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
  const currentCountries = countries.slice(
    indexOfFirstCountry,
    indexOfLastCountry
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleCountdownSubmit = async (e) => {
    e.preventDefault();
    // const seconds = parseInt(e.target.elements.seconds.value);
    console.log("countdowntime", Number(countdowntime));
    // showToast(Number(countdowntime),Number(countdowntime));
    setRemainingSeconds(Number(countdowntime));
  };

  // console.log("countrylist",countrylist)

  useEffect(() => {
    if (remainingSeconds > 0) {
      const countdownInterval = setTimeout(() => {
        showToast(remainingSeconds, remainingSeconds);
        setRemainingSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);

      setTimeout(() => {
        clearInterval(countdownInterval);
      }, remainingSeconds * 1000);
    } else if (remainingSeconds == 0) {
      setIsLoading(true);
      getcountrylist();
      // API call simulation duration
      const apiCallDuration = 5000; // 5 seconds

      // Simulate API call duration before resetting loading state
      setTimeout(() => {
        setIsLoading(false);
      }, apiCallDuration);
    }
  }, [remainingSeconds]);

  const getcountrylist = async () => {
    // Simulate an API call
    try {
      const response = await fetch(
        "https://api.knowmee.co/api/v1/master/get-country-list"
      );
      const resp = await response.json();
      console.log("API Call Successful:", resp);
      // setcountrylist(resp.responseData)
      setCountries(resp.responseData);
    } catch (error) {
      console.error("API Call Error:", error.message);
    }
  };

  return (
    <div>
      {isLoading ? (
        <div
          style={{ fontSize: "30px", textAlign: "center", marginTop: "50px" }}
        >
          Fetching Data, Please wait... 
        </div>
      ) : (
        <>
          <div>
            {countries.length == 0 ? (
              <form
                onSubmit={handleCountdownSubmit}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginTop: "50px",
                  marginLeft: "100px",
                }}
              >
                <label>Enter Countdown Time</label>
                <input
                  type="number"
                  name="seconds"
                  onChange={(e) => setcountdowntime(e.target.value)}
                  style={{
                    marginBottom: "10px",
                    width: "300px",
                    borderRadius: "4px",
                    height: "30px",
                  }}
                  placeholder="Enter here"
                />
                <button
                  style={{
                    width: "300px",
                    borderRadius: "4px",
                    height: "30px",
                  }}
                  type="submit"
                >
                  Start Timer
                </button>
              </form>
            ) : (
              <div>
                {currentCountries.map((country) => (
                  <div style={{ fontSize: "20px" ,marginLeft:"30px",marginTop:"35px"}} key={country.country_id}>
                    {country.country_name}
                  </div>
                ))}

                <div style={{ marginLeft:"1400px", marginTop: "-250px" }}>
                  <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    style={{
                      // marginBottom: "10px",
                      width: "100px",
                      borderRadius: "6px",
                      height: "30px",
                      backgroundColor:currentPage === 1?"white":"lightgreen"
                    }}
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={indexOfLastCountry >= countries.length}
                    style={{
                      marginLeft:"20px",
                      width: "100px",
                      borderRadius: "6px",
                      height: "30px",
                      backgroundColor:"lightgreen"
                    }}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
            {/* <div className="toast-container">
              {toasts.map((toast) => (
                <div key={toast.id}>
                  {toast.remainingDuration > 0 && (
                    <ToastNotification
                      message={`${toast.remainingDuration}`}
                      onClose={() => closeToast(toast.id)}
                      onMouseEnter={() =>
                        clearInterval(toast.remainingDuration)
                      }
                      onMouseLeave={() =>
                        showToast(
                          toast.remainingDuration,
                          toast.remainingDuration
                        )
                      }
                    />
                  )}
                  {toast.remainingDuration === 0 && (
                    <ToastNotification onClose={() => closeToast(toast.id)} />
                  )}
                </div>
              ))}
            </div> */}
          </div>
        </>
      )}
    </div>
  );
}
