import { useState, useEffect, useRef } from "react";
import { Chatbot } from "supersimpledev";
import "./App.css";

const ChatInput = ({ chatMessages, setChatMessages }) => {
  const [inputText, setInputText] = useState("");

  const saveInputText = (event) => {
    setInputText(event.target.value);
  };

  const sendMessage = () => {
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

    // Chatbot external library to get the response:
    const response = Chatbot.getResponse(inputText);

    // set new message (this time from robot/chatbot response)
    setChatMessages([
      ...newChatMessages,
      {
        id: crypto.randomUUID(), // generates random id string
        message: response,
        sender: "robot",
      },
    ]);

    // setInputText is set to "" because we want to set value property from <input /> to empty
    setInputText("");
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
      />
      <button onClick={sendMessage} className="send-button">
        Send
      </button>
    </div>
  );
};

const ChatMessage = ({ message, sender }) => {
  // every component function gets one parameter, called props
  // props is an object and contains all the attributes that we give our component
  // props make our component reusable
  // const { message, image, sender } = props; <---- equals to ----> ({ message, sender })

  return (
    <div
      className={sender === "user" ? "chat-message-user" : "chat-message-robot"}
    >
      {sender === "robot" && (
        <img
          src="./chatbot-images/robot.png"
          className="chat-message-profile"
        />
      )}
      <div className="chat-message-text">{message}</div>
      {sender === "user" && (
        <img src="./chatbot-images/user.png" className="chat-message-profile" />
      )}
    </div>
  );
};

const ChatMessages = ({ chatMessages }) => {
  // useRef lets us automatically save an HTML element from the component
  // React.useRef(); creates ref, ref = container with special React features
  const chatMessagesRef = useRef(null); // initial value, ref is gonna start as empty, that's why we use null

  // useEffect lets us run some code after the component is created or updated
  useEffect(() => {
    // auto scroll when we add new message and container is to big to display it:

    // we get ref inside useEffect because useEffect runs after the component has been created, which means that we need to wait for the component to be created first and then we can access this HTML element
    // to access HTML element saved inside ref:
    const containerElement = chatMessagesRef.current;
    if (containerElement) {
      // to scroll this element to the bottom we can use this code:
      containerElement.scrollTop = containerElement.scrollHeight;
      // .scrollTop = how far from the top should we scroll
      // .scrollHeight = gives us the total height of the element
      // so if we set scrollTop to the total height (containerElement.scrollTop = containerElement.scrollHeight) its gonna scroll all the way to the bottom
    }
  }, [chatMessages]);
  // if we give empty array as a second value to useEffect, empty array will allow the function to run only once, after the component is created/updated
  // if we give for example [chatMessages] as second value to useEffect, function will run every time chatMessages changes
  // this second value is called Dependency Array ---> it lets us crontroll when useEffect runs

  return (
    <div
      className="chat-messages-container"
      ref={
        chatMessagesRef
      } /* ref propery gets ref that we created above (which is chatMessagesRef)*/
      /* React will tahe this HTML element and save it inside chatMessagesRef variable/continer*/
    >
      {chatMessages.map((chatMessage) => {
        // .map() lets us go through array and convert each value to a new value
        return (
          <ChatMessage
            message={chatMessage.message}
            sender={chatMessage.sender}
            key={chatMessage.id}
          />
        );
      })}
    </div>
  );
};

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
