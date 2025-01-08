import { useState } from "react";
import { Chatbot } from "supersimpledev";
import "./ChatInput.css";

export const ChatInput = ({ chatMessages, setChatMessages }) => {
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const saveInputText = (event) => {
    setInputText(event.target.value);
  };

  const sendMessage = async () => {
    // chatMessages.push({
    //   id: crypto.randomUUID(), // generates random id string
    //   message: "test",
    //   sender: "user",
    // });

    // in React, we should not update the data directly
    // instead of updating the data directly with variable, we will use setChatMessage (updater function) to change data to that the state data gets changed and HTML responds to that change
    const newChatMessages = [
      // in React, we sould not modify the data directly.
      // we should always create a copy of that data,
      // and then modify the copy
      // (this helps React be more efficient)
      ...chatMessages, // spread operator (to create array copy)
      {
        id: crypto.randomUUID(), // generates random id string
        message: inputText,
        sender: "user",
      },
    ];

    // the reason we have newChatMessages variable is to have it saved
    // when we setChatMessage with that array directly, state does not update immediately, state is updated after all of the code is finished
    // without that data set in a seperate varibale (newChatMessages), we will not get displayed both user and robot message, only robot message
    // because code was not finised and state was not updated fully
    // with this variable, we have data saved inside variable and then be setChatMessages with that varibale and both user and robot message will be displayed
    setChatMessages(newChatMessages);

    // setInputText is set to "" because we want to set value property from <input /> to empty
    setInputText("");

    // set message to loading before we get the response
    // we set array directly to setChatMessage to not update state immediately, state is updated after all of the code is finished and the loading response gets overwriten by robot response at the end of this function
    setChatMessages([
      ...newChatMessages,
      {
        id: crypto.randomUUID(),
        message: "Loading...",
        sender: "robot",
      },
    ]);
    // set isLoadin to true before we get response to avoid sending new message
    setIsLoading(true);

    // Chatbot external library to get the response:
    const response = await Chatbot.getResponseAsync(inputText);

    // set new message (this time from robot/chatbot response)
    setChatMessages([
      ...newChatMessages,
      {
        id: crypto.randomUUID(), // generates random id string
        message: response,
        sender: "robot",
      },
    ]);
    // set isLoading to false after we get reponse to allow new messages to be send
    setIsLoading(false);
  };

  return (
    <div className="chat-input-container">
      <input
        type="text"
        placeholder="Send a message to Chatbot"
        size="30"
        onChange={saveInputText}
        value={inputText} // controlled input -> using the value prop, we can controll the text inside that textbox
        className="chat-input"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            if (isLoading === false && inputText !== "") sendMessage();
          } else if (e.key === "Escape") {
            setInputText("");
          }
        }}
      />
      <button
        onClick={isLoading || inputText === "" ? null : sendMessage}
        className="send-button"
      >
        Send
      </button>
    </div>
  );
};
