import React, {useEffect, useRef, useState} from 'react';
import './App.css';
import Break from './components/Break'
import Session from "./components/Session"
import TimeLeft from './components/TimeLeft';


function App() {
  const audioElement = useRef(null)
  const [currentSessionType, setCurrentSessionType] = useState('Session'); //session or break
  const [intervalId, setIntervalId ] = useState(null);
  const [sessionLength, setSessionLength] = useState(60 * 25) //300 seconds
  const [breakLength, setBreakLength] = useState(300) //300 seconds
  const [timeLeft, setTimeLeft ] = useState(sessionLength);


  //change time left whenevr sessionleft changes

  useEffect(() => {
      setTimeLeft(sessionLength);
  }, [sessionLength]);  


  const decrementBreakLengthByOneMinute = () => {
      const newBreakLength = breakLength - 60;

      if(newBreakLength > 0) {
          setBreakLength(newBreakLength);
      }
  };

  const incrementBreaklengthByOneMinute = () => {
      const newBreakLength =breakLength + 60
      if(newBreakLength <= 60 * 60){
          setBreakLength(newBreakLength);
      }
  };
    
    const decrementSessionLengthByOneMinute = () => {
        const newSessionLength = sessionLength - 60;
        if(newSessionLength > 0) {
            setSessionLength(newSessionLength);
        }
    };

    const incrementSessionlengthByOneMinute = () => {
        const newSessionLength = sessionLength + 60;
        if(newSessionLength <= 60 * 60){
            setSessionLength(sessionLength + 60);
        }
    };

    const isStarted = intervalId != null;
    const handleStartStopClick = () => {

        if(isStarted){
        //if we are in started mode:
        //we want to stop thed timer
        //clearInterval
            clearInterval(intervalId);
            setIntervalId(null); //turns stop back to start
        } else {
        //if we are in stopped mode:
        //decrement timeLeft by one every second (1000ms)
        //use setInterval function
        const newIntervalId = setInterval(() => {
            setTimeLeft(prevTimeLeft => {

                const newTimeLeft = prevTimeLeft-1;
                if(newTimeLeft >= 0) {
                    return newTimeLeft;
                }
                //time left is less than 0
                audioElement.current.play()
                //if session:
                if(currentSessionType === 'Session') {

                //switch to break
                setCurrentSessionType('Break')
                // setTimeLeft to sessionLength
               return breakLength;
            }   
                //if break:
                else if(currentSessionType === 'Break') {
                    setCurrentSessionType('Session')
                //switch to session
                    setTimeLeft(sessionLength);
                // setTimeLeft to sessionLength
            }

            });
        }, 1000); // TODO: TURN BACK TO 1000
        setIntervalId(newIntervalId);
        }
 
    };

    const handleResetButtonClick = () => {
      //reset audio
      audioElement.current.load()
      //clear the timeout interval
      clearInterval(intervalId)
      //set the intervalId null
      setIntervalId(null)
      //set the sessiontype to 'Session'
      setCurrentSessionType('Session')
      //reset the session length to 25 minutes
      setSessionLength(60 * 25)
      //reset the break length to 5 minutes
      setBreakLength(60 * 5)
      //reset the timer to 25 minutes (initial session length)
      setTimeLeft(60 * 25)
    }

  return (
    <div className="App">
      <Break 
      breakLength={breakLength}
      decrementBreakLengthByOneMinute={decrementBreakLengthByOneMinute}
      incrementBreaklengthByOneMinute={incrementBreaklengthByOneMinute}
      />
      <TimeLeft 
      handleStartStopClick={handleStartStopClick}
      timerLabel={currentSessionType} 
      startStopButtonLabel={isStarted? 'Stop' : 'Start'}
      timeLeft={timeLeft}


      />
      <Session
      sessionLength={sessionLength}
      decrementSessionLengthByOneMinute={decrementSessionLengthByOneMinute}
      incrementSessionlengthByOneMinute={incrementSessionlengthByOneMinute}
      
      />

      <button id="reset" onClick={handleResetButtonClick}>
        Reset
      </button>
      <audio id="beep" ref={audioElement}>
        <source src="https://onlineclock.net/audio/options/default.mp3" type="audio/mpeg"/>
      </audio>
    </div>
  );
}

export default App;
