// this version contains the email transcript functionality

// import React, { useEffect, useState, useRef } from "react";
// import { setupBotStatusChecker } from "../utils/botStatusChecker";
// import "./styles/ChatButton.css";
// import onlineIcon from "./assets/chat-bot-icon-online.svg";
// import offlineIcon from "./assets/chat-bot-icon-offline.svg";
// import closeIcon from "./assets/close-icon.svg";
// import "./styles/ChatbotModal.css";
// import optionsIcon from "./assets/options-icon.svg";
// import sendButton from "./assets/send-button.svg";
// import emailIcon from "./assets/email.svg";
// import endChatIcon from "./assets/end-chat.svg";
// import resetEmailIcon from "./assets/reset-email.svg";
// import Toast from "./Toast";
// import infoIcon from "./assets/info-icon.svg";
// import errorIcon from "./assets/error-icon.svg";
// import validator from "validator";
// import { v4 as uuidv4 } from "uuid";
// import { sendChatMessage } from "../utils/chatMessageHandler";
// import sendButtonDisabled from "./assets/send-button-disabled.svg";
// import ReactMarkdown from "react-markdown";

// const App = () => {
//   const [isOnline, setIsOnline] = useState(true);
//   const [isChatOpen, setIsChatOpen] = useState(false);
//   const [showTooltip, setShowTooltip] = useState(false);
//   const [iconState, setIconState] = useState("entering");
//   const [showOptionsMenuModal, setShowOptionsMenuModal] = useState(false);
//   const [menuState, setMenuState] = useState("entering");
//   const [inputState, setInputState] = useState("entering");
//   const [showInput, setShowInput] = useState(true);
//   const [showEmailTranscriptModal, setShowEmailTranscriptModal] =
//     useState(false);
//   const [emailState, setEmailState] = useState("entering");
//   const [emailInput, setEmailInput] = useState("");
//   const [emailSendStatus, setEmailSendStatus] = useState(null); // success, error, sending
//   const [isInvalidEmail, setIsInvalidEmail] = useState(false);
//   const [messages, setMessages] = useState([]);
//   const [inputText, setInputText] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const messagesEndRef = useRef(null);
//   const [roomId, setRoomId] = useState(null);

//   const isTouchDevice = () => {
//     return "ontouchstart" in window || navigator.maxTouchPoints > 0;
//   };

//   useEffect(() => {
//     // Setup status checking and get cleanup function
//     const cleanupStatusChecker = setupBotStatusChecker(setIsOnline);

//     // Clean up interval on component unmount
//     return cleanupStatusChecker;
//   }, []);

//   const handleClick = () => {
//     if (isOnline) {
//       setIconState("exiting");
//       setTimeout(() => {
//         setIsChatOpen((prevState) => !prevState);
//         setIconState("entering");
//         setInputState("entering");
//         if (isChatOpen) {
//           setShowOptionsMenuModal(false);
//           setShowInput(true);
//           setShowEmailTranscriptModal(false);
//         }
//       }, 300);
//     }
//     if (!isOnline && isTouchDevice()) {
//       setShowTooltip(true);
//       setTimeout(() => setShowTooltip(false), 5000);
//     }
//   };

//   const handleMouseEnter = () => {
//     if (!isOnline) {
//       setShowTooltip(true);
//       setTimeout(() => setShowTooltip(false), 5000);
//     }
//   };

//   const handleOptionsOnClick = () => {
//     if (showOptionsMenuModal) {
//       setMenuState("exiting");
//       setInputState("entering");
//       setTimeout(() => {
//         setShowEmailTranscriptModal(false);
//         setShowOptionsMenuModal(false);
//         setShowInput(true);
//       }, 300);
//     } else if (!showOptionsMenuModal && showEmailTranscriptModal) {
//       setTimeout(() => {
//         setShowEmailTranscriptModal(false);
//         setShowInput(true);
//         setEmailInput("");
//       }, 300);
//       setInputState("entering");
//       setEmailState("exiting");
//     } else {
//       setTimeout(() => {
//         setShowEmailTranscriptModal(false);
//         setShowOptionsMenuModal(true);
//         setShowInput(false);
//       }, 300);
//       setMenuState("entering");
//       setInputState("exiting");
//     }
//   };

//   const handleEndChat = () => {
//     setRoomId(null);
//     setMessages([]);
//     setMenuState("exiting");
//     setInputState("entering");
//     setTimeout(() => {
//       setShowOptionsMenuModal(false);
//       setShowInput(true);
//     }, 300);
//   };

//   const handleEmailTranscript = () => {
//     // close menu modal and open email transcript modal
//     setMenuState("exiting");
//     setEmailState("entering");
//     setInputState("exiting");
//     setTimeout(() => {
//       setShowOptionsMenuModal(false);
//       setShowEmailTranscriptModal(true);
//       setShowInput(false);
//     }, 300);
//   };

//   const handleEmailInputChange = (e) => {
//     setEmailInput(e.target.value);
//     if (isInvalidEmail) {
//       setIsInvalidEmail(false);
//     }
//   };

//   const handleEmailInputClick = () => {
//     if (isInvalidEmail) {
//       setIsInvalidEmail(false);
//     }
//   };

//   const handleSendEmail = () => {
//     setEmailSendStatus("sending");

//     // TODO:
//     if (!validator.isEmail(emailInput)) {
//       setIsInvalidEmail(true);
//       setEmailSendStatus(null);
//       return;
//     }
//     setIsInvalidEmail(false);
//     // calls backend API to send email transcript
//     // on success, set emailSendStatus to "success"
//     // on error, set emailSendStatus to "error"
//     setTimeout(() => {
//       setEmailSendStatus("success");
//     }, 2000);
//     setEmailInput("");
//     handleCancel();
//   };

//   const handleCancel = () => {
//     setEmailState("exiting");
//     setInputState("entering");
//     setTimeout(() => {
//       setShowEmailTranscriptModal(false);
//       setShowInput(true);
//       setEmailInput(""); // Clear the email input when canceling
//     }, 300);
//   };

//   const handleMessageSend = async () => {
//     if (!inputText.trim()) return;

//     // Create a local variable to hold the roomId value
//     let currentRoomId = roomId;

//     // If roomId is null, generate a new one and use it
//     if (!currentRoomId) {
//       currentRoomId = uuidv4();
//       setRoomId(currentRoomId);
//       console.log("Setting room id", currentRoomId);
//     }

//     // Add user message to chat
//     const userMessage = {
//       type: "user",
//       text: inputText,
//     };
//     setMessages((prev) => [...prev, userMessage]);

//     // Clear input and set loading
//     setInputText("");
//     setIsLoading(true);

//     // Use the local variable instead of the state variable
//     const result = await sendChatMessage(inputText, currentRoomId);
//     setMessages((prev) => [
//       ...prev,
//       {
//         type: result.success ? "chatbot" : "chatbot failed",
//         text: result.response,
//       },
//     ]);

//     setIsLoading(false);
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   return (
//     <>
//       <button
//         className={`chat-button 
//           ${isOnline ? "online" : "offline"} 
//           ${isChatOpen ? "open" : "close"}`}
//         onClick={handleClick}
//         onMouseEnter={handleMouseEnter}
//         aria-label={isChatOpen ? "Close chat" : "Open chat"}
//       >
//         {isOnline ? (
//           <img
//             src={isChatOpen ? closeIcon : onlineIcon}
//             alt="Online Chat icon"
//             className={iconState}
//           />
//         ) : (
//           <img
//             src={offlineIcon}
//             alt="Offline Chat icon"
//             className={iconState}
//           />
//         )}
//       </button>

//       {showTooltip && !isOnline && (
//         <div className="tooltip">
//           KAI-AI is on a quick coffee break! ☕ Don’t worry, I’ll be back soon.
//         </div>
//       )}

//       {isChatOpen && isOnline && (
//         <div className={`chatbot-modal ${iconState}`}>
//           <div className="chatbot-header">
//             <div className="chatbot-info">
//               <img
//                 src={onlineIcon}
//                 style={{ width: "29.4px", height: "35.114px", flexShrink: 0 }}
//               />
//               <span>KAI-AI</span>
//             </div>
//             <button className="options-icon" aria-label="Options">
//               <img
//                 src={optionsIcon}
//                 alt="Options Icon"
//                 onClick={handleOptionsOnClick}
//               />
//             </button>
//           </div>

//           <div className="chatbot-content">
//             {emailSendStatus === "success" && (
//               <Toast
//                 icon={infoIcon}
//                 text="Successfully sent"
//                 textColor="#7EDA6C"
//                 backgroundColor="#1F5214"
//                 boxShadowColor="rgba(87, 207, 63, 0.25)"
//                 borderColor="rgba(64, 171, 43, 0.25)"
//               />
//             )}
//             {emailSendStatus === "error" && (
//               <Toast
//                 icon={errorIcon}
//                 text="Error occured. Please try again later."
//                 textColor="#F0A6A0"
//                 backgroundColor="#5D2422"
//                 boxShadowColor="rgba(235, 128, 122, 0.25)"
//                 borderColor="rgba(232, 91, 86, 0.15)"
//               />
//             )}
//             <p className="tnc" style={{ marginBottom: "6px" }}>
//               TnC applied
//             </p>

//             <div className="chatbot message">
//               <p>Hey there! 👋🏾</p>
//             </div>
//             <div className="chatbot message">
//               <p>
//                 Hello, I am Kaia AI Agent, simply ask me a question! Anything is
//                 welcomed!
//               </p>
//             </div>

//             {messages.map((message, index) => (
//               <>
//                 {index === messages.length - 1 && (
//                   <div ref={messagesEndRef} style={{ display: "hidden" }} />
//                 )}
//                 <div key={index} className={`${message.type} message`}>
//                   <ReactMarkdown
//                     allowedElements={[
//                       "p",
//                       "a",
//                       "strong",
//                       "em",
//                       "code",
//                       "pre",
//                       "h1",
//                       "h2",
//                       "h3",
//                       "h4",
//                       "h5",
//                       "h6",
//                       "ul",
//                       "ol",
//                       "li",
//                       "table",
//                       "thead",
//                       "tbody",
//                       "tr",
//                       "th",
//                       "td",
//                     ]}
//                   >
//                     {message.text}
//                   </ReactMarkdown>
//                 </div>
//               </>
//             ))}
//             {isLoading && (
//               <div className="chatbot message">
//                 <p>...</p>
//               </div>
//             )}
//           </div>

//           {showInput && !showEmailTranscriptModal && !showOptionsMenuModal && (
//             <div className={`chatbot-input ${inputState}`}>
//               <textarea
//                 placeholder="Write your message"
//                 aria-label="Type your message"
//                 value={inputText}
//                 onChange={(e) => setInputText(e.target.value)}
//                 onKeyDown={(e) => {
//                   if (e.key === "Enter") {
//                     if (e.shiftKey) {
//                       return;
//                     } else {
//                       e.preventDefault();
//                       handleMessageSend();
//                     }
//                   }
//                 }}
//                 disabled={isLoading}
//                 rows={1}
//               />
//               <button
//                 className="send-button"
//                 aria-label="Send"
//                 onClick={handleMessageSend}
//                 disabled={isLoading}
//               >
//                 <div className="send-button-background">
//                   <img src={isLoading ? sendButtonDisabled : sendButton} />
//                 </div>
//               </button>
//             </div>
//           )}

//           {!showInput && !showEmailTranscriptModal && showOptionsMenuModal && (
//             <div className={`menu-modal ${menuState}`}>
//               <button onClick={handleEmailTranscript}>
//                 <img src={emailIcon} />
//                 <span>Email transcript</span>
//               </button>
//               <button onClick={handleEndChat}>
//                 <img src={endChatIcon} />
//                 <span style={{ color: "#E85B56" }}>
//                   End the chat and Start a new chat
//                 </span>
//               </button>
//             </div>
//           )}

//           {!showInput && showEmailTranscriptModal && !showOptionsMenuModal && (
//             <div className={`email-transcript-modal ${emailState}`}>
//               <div className="email-input">
//                 <input
//                   type="email"
//                   placeholder="Enter your email"
//                   value={emailInput}
//                   onChange={handleEmailInputChange}
//                   onClick={handleEmailInputClick}
//                   className={isInvalidEmail ? "invalid" : ""}
//                 />
//                 {emailInput && (
//                   <img
//                     src={resetEmailIcon}
//                     alt="Resets the email field"
//                     onClick={() => setEmailInput("")}
//                   />
//                 )}
//                 {isInvalidEmail && (
//                   <p className="invalid-email-error-message">
//                     Please enter a valid email
//                   </p>
//                 )}
//               </div>
//               <div className="button-group">
//                 <button className="cancel-button" onClick={handleCancel}>
//                   Cancel
//                 </button>
//                 <button
//                   className={`email-send-button ${emailInput ? "active" : ""}`}
//                   onClick={handleSendEmail}
//                   disabled={!emailInput}
//                 >
//                   {emailSendStatus === "sending" ? "Sending..." : "Send"}
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       )}
//     </>
//   );
// };

// export default App;
