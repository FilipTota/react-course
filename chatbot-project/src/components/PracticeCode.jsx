import { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import "./PracticeCode.css";

export const PracticeCode = () => {
  const [currentTime, setCurrentTime] = useState(dayjs().format("HH:mm:ss"));
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");
  const [isButtonOn, setIsButtonOn] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const updateCounterButton = useRef(null);
  const counterInterval = useRef(null); // Store interval ID in a ref
  // useRef is used to persist the interval ID (counterInterval.current) across renders
  // this is necessary because the interval ID needs to be kept for later reference, even if the component re-renders

  // clock that gets updated every 1 sec
  useEffect(() => {
    setInterval(() => {
      setCurrentTime(dayjs().format("HH:mm:ss"));
    }, 1000);
  }, []);

  // update count
  const updateCounter = () => {
    setCount(count + 1);
  };
  const resetCounter = () => {
    setCount(0);
    clearInterval(counterInterval.current);
  };
  const counterAutoClick = () => {
    const buttonElement = updateCounterButton.current;

    // Start the interval and store the ID
    counterInterval.current = setInterval(() => {
      if (buttonElement) {
        buttonElement.click();
      }
    }, 1000);
  };

  // display as you type
  const displayText = (e) => {
    setText(e.target.value);
  };
  const resetText = () => {
    setText("");
  };
  const displayExampleText = () => {
    setText("Example");
  };

  // switch button ON & OFF
  const switchButton = () => {
    setIsButtonOn(!isButtonOn);
  };

  // show or hide password
  const showHidePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <span className="practice-code-title">Clock:</span>
      <p>Current time:{currentTime}</p>

      <span className="practice-code-title">Login form:</span>
      <div className="practice-code-container">
        <div>
          <input type="email" placeholder="Email" className="input-element" />
        </div>
        <div>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="input-element"
          />
          <button onClick={showHidePassword}>
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        <div>
          <button className="login-form-button">Login</button>
          <button className="login-form-button">Sign up</button>
        </div>
      </div>

      <span className="practice-code-title">Counter:</span>
      <div className="practice-code-container">
        <button
          className="counter-button"
          onClick={updateCounter}
          ref={updateCounterButton}
        >
          Clicked {count} times
        </button>
        <button className="counter-button" onClick={resetCounter}>
          Reset
        </button>
        <button className="counter-button" onClick={counterAutoClick}>
          Auto Click
        </button>
      </div>

      <span className="practice-code-title">Display as you type:</span>
      <div className="practice-code-container">
        <input
          type="text"
          placeholder="Type something"
          onChange={displayText}
          value={text}
        />
        <button onClick={resetText}>Reset</button>
        <button onClick={displayExampleText}>Example</button>
        <p>{text}</p>
      </div>

      <span className="practice-code-title">Button with CSS:</span>
      <div className="practice-code-container">
        <button
          className={isButtonOn ? "on-button" : "off-button"}
          onClick={switchButton}
        >
          {isButtonOn ? "ON" : "OFF"}
        </button>
      </div>
    </>
  );
};
