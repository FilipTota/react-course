import { useState } from "react";
import { ChatInput } from "./components/ChatInput";
import ChatMessages from "./components/ChatMessages"; // default export
import "./App.css";

const App = () => {
  // save the data/information for chat messages using react state
  // state = state is a data that is connected to HTML
  // -> when we update this data it will update the HTML
  // if we just have the variable as a data, when ve add something to that data it will not update the HTML/it will not get diplayed on the browser in our code example, but when we save that data inside state, then it will update it
  const [chatMessages, setChatMessages] = useState([
    // array destructoring upon seting useState
    {
      id: "id1",
      message: "hello chatbot",
      sender: "user",
    },
    {
      id: "id2",
      message: "Hello! How can I help you?",
      sender: "robot",
    },
    {
      id: "id3",
      message: "can you get me todays date?",
      sender: "user",
    },
    {
      id: "id4",
      message: "Today is January 2",
      sender: "robot",
    },
  ]);

  // array destructoring (order matters, first array value gets stored inside chatMessages, and second value inside setChatMessages)
  // const [chatMessages, setChatMessages] = array;

  // const chatMessages = array[0]; // array[0] gets us first value, initial value (in our case list of objects stored inside state)
  // // chatMessages initial value can change (if we add new chat message, initial value will be changed)
  // const setChatMessages = array[1]; // array[1] is the second value which contains function that updates this data

  return (
    <div className="app-container">
      <ChatMessages chatMessages={chatMessages} />
      <ChatInput
        // sending state as a properties to access these state data (chatMessages & setChatMessages) inside ChatInput component
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
      />
    </div>
  );
};

export default App;
