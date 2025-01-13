import { useEffect, useRef } from "react";
import { ChatMessage } from "./ChatMessage";
import "./ChatMessages.css";

// Custom hook for autoScroll
const useAutoScroll = (dependencies) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const containerElement = containerRef.current;
    if (containerElement) {
      // to scroll this element to the bottom we can use this code:
      containerElement.scrollTop = containerElement.scrollHeight;
    }
  }, [dependencies]);

  return containerRef;
};

const ChatMessages = ({ chatMessages }) => {
  const chatMessagesRef = useAutoScroll(chatMessages);

  // // useRef lets us automatically save an HTML element from the component
  // // React.useRef(); creates ref, ref = container with special React features
  // const chatMessagesRef = useRef(null); // initial value, ref is gonna start as empty, that's why we use null

  // // useEffect lets us run some code after the component is created or updated
  // useEffect(() => {
  //   // auto scroll when we add new message and container is to big to display it:

  //   // we get ref inside useEffect because useEffect runs after the component has been created, which means that we need to wait for the component to be created first and then we can access this HTML element
  //   // to access HTML element saved inside ref:
  //   const containerElement = chatMessagesRef.current;
  //   if (containerElement) {
  //     // to scroll this element to the bottom we can use this code:
  //     containerElement.scrollTop = containerElement.scrollHeight;
  //     // .scrollTop = how far from the top should we scroll
  //     // .scrollHeight = gives us the total height of the element
  //     // so if we set scrollTop to the total height (containerElement.scrollTop = containerElement.scrollHeight) its gonna scroll all the way to the bottom
  //   }
  // }, [chatMessages]);
  // // if we give empty array as a second value to useEffect, empty array will allow the function to run only once, after the component is created/updated
  // // if we give for example [chatMessages] as second value to useEffect, function will run every time chatMessages changes
  // // this second value is called Dependency Array ---> it lets us crontroll when useEffect runs

  return (
    <div
      className="chat-messages-container"
      ref={
        chatMessagesRef
      } /* ref propery gets ref that we created above (which is chatMessagesRef)*/
      /* React will tahe this HTML element and save it inside chatMessagesRef variable/continer*/
    >
      {chatMessages.length !== 0 ? (
        chatMessages.map((chatMessage) => {
          // .map() lets us go through array and convert each value to a new value
          return (
            <ChatMessage
              message={chatMessage.message}
              sender={chatMessage.sender}
              key={chatMessage.id}
              time={chatMessage.time}
            />
          );
        })
      ) : (
        <p className="welcome-message">
          Welcome to the Chatbot project! Send a message using the textbox below
        </p>
      )}
    </div>
  );
};

export default ChatMessages;
