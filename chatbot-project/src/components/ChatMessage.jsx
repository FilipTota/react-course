import RobotProfileImg from "../assets/robot.png";
import UserProfileImg from "../assets/user.png";
import "./ChatMessage.css";

export const ChatMessage = ({ message, sender }) => {
  // every component function gets one parameter, called props
  // props is an object and contains all the attributes that we give our component
  // props make our component reusable
  // const { message, image, sender } = props; <---- equals to ----> ({ message, sender })

  return (
    <div
      className={sender === "user" ? "chat-message-user" : "chat-message-robot"}
    >
      {sender === "robot" && (
        <img src={RobotProfileImg} className="chat-message-profile" />
      )}
      <div className="chat-message-text">{message}</div>
      {sender === "user" && (
        <img src={UserProfileImg} className="chat-message-profile" />
      )}
    </div>
  );
};