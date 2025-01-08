import { useState } from "react";
import dayjs from "dayjs";
import "./PracticeCode.css";

export const PracticeCode = () => {
  const [currentTime, setCurrentTime] = useState(dayjs().format("HH:mm:ss"));
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  // clock that gets updated every 1 sec
  const updateCurrentTime = () => {
    setInterval(() => {
      setCurrentTime(dayjs().format("HH:mm:ss"));
    }, 1000);
  };
  updateCurrentTime();

  // update count
  const updateCounter = () => {
    setCount(count + 1);
  };
  const resetCounter = () => {
    setCount(0);
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

  return (
    <>
      <span className="practice-code-title">Clock:</span>
      <p>Current time:{currentTime}</p>

      <span className="practice-code-title">Login form:</span>
      <div className="practice-code-container">
        <div>
          <input type="email" placeholder="Email" />
        </div>
        <div>
          <input type="password" placeholder="Password" />
        </div>
        <div>
          <button>Login</button>
          <button>Sign up</button>
        </div>
      </div>

      <span className="practice-code-title">Counter:</span>
      <div className="practice-code-container">
        <button onClick={updateCounter}>Clicked {count} times</button>
        <button onClick={resetCounter}>Reset</button>
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
    </>
  );
};
