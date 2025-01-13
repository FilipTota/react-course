import { useEffect, useState } from "react";
import { ChatInput } from "./components/ChatInput";
import ChatMessages from "./components/ChatMessages"; // default export
import { Chatbot } from "supersimpledev";
import "./App.css";

import { PracticeCode } from "./components/PracticeCode";

const App = () => {
  // save the data/information for chat messages using react state
  // state = state is a data that is connected to HTML
  // -> when we update this data it will update the HTML
  // if we just have the variable as a data, when ve add something to that data it will not update the HTML/it will not get diplayed on the browser in our code example, but when we save that data inside state, then it will update it
  const [chatMessages, setChatMessages] = useState(
    JSON.parse(localStorage.getItem("messages")) || []
  ); // array destructoring upon seting useState

  // array destructoring (order matters, first array value gets stored inside chatMessages, and second value inside setChatMessages)
  // const [chatMessages, setChatMessages] = array;

  // const chatMessages = array[0]; // array[0] gets us first value, initial value (in our case list of objects stored inside state)
  // // chatMessages initial value can change (if we add new chat message, initial value will be changed)
  // const setChatMessages = array[1]; // array[1] is the second value which contains function that updates this data

  // add additional chatbot responses:
  useEffect(() => {
    Chatbot.addResponses({
      "tell me your name": "My name is Chatbot",
    });
  }, []);

  // run whenever chatMessages chages:
  useEffect(() => {
    localStorage.setItem("messages", JSON.stringify(chatMessages));
  }, [chatMessages]);

  return (
    <div className="app-container">
      <ChatMessages chatMessages={chatMessages} />
      <ChatInput
        // sending state as a properties to access these state data (chatMessages & setChatMessages) inside ChatInput component
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
      />
      <PracticeCode />
    </div>
  );
};

export default App;
