import moment from 'moment'
import React, { useState } from 'react';


const Break = ({
    breakLength,
    decrementBreakLengthByOneMinute,
    incrementBreaklengthByOneMinute,
}) => {
   

    const breakLengthInMinutes = moment.duration(breakLength, 's').asMinutes()

    return ( 
    <div>
     <p id="break-label">Break</p>
     <p id="break-length">{breakLengthInMinutes}</p>
        <button id="break-decrement" onClick={decrementBreakLengthByOneMinute}>-</button>
        <button id="break-increment" onClick={incrementBreaklengthByOneMinute}>+</button>

    </div>

    );
};

export default Break;
