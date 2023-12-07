import { useEffect, useState } from "react";

function CountDown({ weddingDate }) {
  const [countDownMessage, setCountDownMessage] = useState("Just a little bit longer...")
  const [countdown, setCountdown] = useState([])

  const weddingDateFormatted = new Date(weddingDate);
  
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      
      const timeDifference = weddingDateFormatted - now

      if (timeDifference <= 0){
        clearInterval(interval)
        setCountdown([0, 0, 0, 0])
        setCountDownMessage('Your special day has come!')
      } else {
        const calculatedDays = Math.floor(timeDifference / (1000 * 60 * 60 * 24))
        const calculatedHours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const calculatedMinutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60))
        const calculatedSeconds = Math.floor((timeDifference % (1000 * 60)) / 1000)

        setCountdown([calculatedDays, calculatedHours, calculatedMinutes, calculatedSeconds])
      }

    }, 1000);
    return () => clearInterval(interval);

  }, [weddingDate]);

  return (
    <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
        <h1>{countDownMessage}</h1>
      <div className="flex flex-col">
        <span className="countdown font-mono text-5xl">
          <span style={{ "--value": countdown[0] }}></span>
        </span>
        days
      </div>
      <div className="flex flex-col">
        <span className="countdown font-mono text-5xl">
          <span style={{ "--value": countdown[1] }}></span>
        </span>
        hours
      </div>
      <div className="flex flex-col">
        <span className="countdown font-mono text-5xl">
          <span style={{ "--value": countdown[2] }}></span>
        </span>
        min
      </div>
      <div className="flex flex-col">
        <span className="countdown font-mono text-5xl">
          <span style={{ "--value": countdown[3] }}></span>
        </span>
        sec
      </div>
    </div>
  );
}

export default CountDown;
