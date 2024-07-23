import React, { useState, useRef } from 'react';
import ResultModel from './ResultModel';

const TimerChallenge = ({ title, targetTime }) => {
  const timer = useRef();
  const dialog = useRef();
  const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);
  const [timerStarted, setTimerStarted] = useState(false);

  const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;

  const handleStart = () => {
    if (timer.current) clearInterval(timer.current); // Clear any existing interval

    timer.current = setInterval(() => {
      setTimeRemaining((prevTimeRemaining) => {
        if (prevTimeRemaining <= 10) {
          clearInterval(timer.current);
          dialog.current.showModal();
          setTimerStarted(false);
          return targetTime * 1000; // Reset to initial time
        }
        return prevTimeRemaining - 10;
      });
    }, 10);

    setTimerStarted(true);
  };

  const handleReset = () => {
    setTimeRemaining(targetTime * 1000);
    if (timer.current) clearInterval(timer.current); // Clear any existing interval
    setTimerStarted(false);
  };

  const handleStop = () => {
    clearInterval(timer.current);
    dialog.current.showModal();
    setTimerStarted(false);
  };

  return (
    <>
      <ResultModel
        ref={dialog}
        targetTime={targetTime}
        result="lost"
        remainingTime={timeRemaining}
        onReset={handleReset}
      />

      <section className="challenge">
        <h2>{title}</h2>

        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? "s" : ""}
        </p>
        <p>
          <button onClick={timerStarted ? handleStop : handleStart}>
            {timerStarted ? 'Stop' : 'Start'} Challenge
          </button>
        </p>
        <p className={timerIsActive ? 'active' : undefined}>
          {timerIsActive ? 'Time is running...' : 'Timer inactive'}
        </p>
      </section>
    </>
  );
};

export default TimerChallenge;
