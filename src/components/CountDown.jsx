import { useEffect, useState } from "react";

function CountDown({ weddingDate }) {
  const [countDownMessage, setCountDownMessage] = useState(
    "Just a little bit longer..."
  );
  const [countdown, setCountdown] = useState([]);

  const weddingDateFormatted = new Date(weddingDate);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();

      const timeDifference = weddingDateFormatted - now;

      if (timeDifference <= 0) {
        clearInterval(interval);
        setCountdown([0, 0, 0, 0]);
        setCountDownMessage("Your special day has come!");
      } else {
        const calculatedDays = Math.floor(
          timeDifference / (1000 * 60 * 60 * 24)
        );
        const calculatedHours = Math.floor(
          (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const calculatedMinutes = Math.floor(
          (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const calculatedSeconds = Math.floor(
          (timeDifference % (1000 * 60)) / 1000
        );

        setCountdown([
          calculatedDays,
          calculatedHours,
          calculatedMinutes,
          calculatedSeconds,
        ]);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [weddingDate]);

  return (
    <div>
      <div className="countdown-container">
        <div className="countdown-digit">{countdown[0]}</div>
        <div className="countdown-digit">{countdown[1]}</div>
        <div className="countdown-digit">{countdown[2]}</div>
        <div className="countdown-digit">{countdown[3]}</div>
      </div>
      <h2 className="countdown-mssg">{countDownMessage}</h2>
    </div>
  );
}

export default CountDown;
