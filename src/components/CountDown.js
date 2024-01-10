import React, { useEffect } from 'react';

const CountDown = ({ countDown, setCountDown }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (countDown > 0) {
        setCountDown(countDown - 1);
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [countDown]);

  const minutes = Math.floor(countDown / 60);
  const remainingSeconds = countDown % 60;

  return (
    <div style={{ color: 'red', marginTop: '10px', fontSize: '20px' }}>
      <p>
        Time Remaining: {minutes}m : {remainingSeconds}s
      </p>
    </div>
  );
};

export default CountDown;
