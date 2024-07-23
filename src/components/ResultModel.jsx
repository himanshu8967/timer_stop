import React, { forwardRef } from 'react';

const ResultModel = forwardRef(function ResultModel({ result, targetTime, remainingTime, onReset }, ref) {
    const userLost = remainingTime <= 0;
    const formattedRemainingTime = (remainingTime / 1000).toFixed(2); // Fixed variable name and syntax
    const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100);

    return (
        <dialog ref={ref} className='result-modal'>
            {userLost && <h2>YOU LOST</h2>}
            {!userLost && <h2>Your Score: {score}</h2>}
            <p>
                The target time was <strong>{targetTime} seconds.</strong>
            </p>
            <p>
                You stopped the timer with <strong>{formattedRemainingTime} seconds left.</strong>
            </p>
            <form method='dialog' onSubmit={onReset}>
                <button type='submit'>Close</button>
            </form>
        </dialog>
    );
});

export default ResultModel;
