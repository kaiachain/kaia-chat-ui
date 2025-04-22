import React, { useEffect, useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import ReactMarkdown from "react-markdown";
import "../styles/ChatButton.css";
import "../styles/ChatbotModal.css";
import LoadingDots from "./LoadingDots";
import { setupBotStatusChecker } from "../utils/botStatusChecker";
import { sendChatMessage, cancelPendingRequests } from "../utils/chatMessageHandler";
import {
  onlineIcon,
  offlineIcon,
  closeIcon,
  optionsIcon,
  sendButton,
  sendButtonDisabled,
  emailIcon,
  endChatIcon,
} from "../assets";

const ChatbotWidget = ({ apiBaseUrl = null, botName = "Kaia AI Agent" }) => {
  const [isOnline, setIsOnline] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [iconState, setIconState] = useState("entering");
  const [showOptionsMenuModal, setShowOptionsMenuModal] = useState(false);
  const [menuState, setMenuState] = useState("entering");
  const [inputState, setInputState] = useState("entering");
  const [showInput, setShowInput] = useState(true);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const [roomId, setRoomId] = useState(null);

  const isTouchDevice = () => {
    return "ontouchstart" in window || navigator.maxTouchPoints > 0;
  };

  useEffect(() => {
    // Setup status checking and get cleanup function
    const cleanupStatusChecker = setupBotStatusChecker(setIsOnline, apiBaseUrl);

    // Clean up interval on component unmount
    return cleanupStatusChecker;
  }, [apiBaseUrl]);

  const handleClick = () => {
    if (isOnline) {
      setIconState("exiting");
      setTimeout(() => {
        setIsChatOpen((prevState) => !prevState);
        setIconState("entering");
        setInputState("entering");
        if (isChatOpen) {
          setShowOptionsMenuModal(false);
          setShowInput(true);
        }
      }, 300);
    }
    if (!isOnline && isTouchDevice()) {
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 5000);
    }
  };

  const handleMouseEnter = () => {
    if (!isOnline) {
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 5000);
    }
  };

  const handleOptionsOnClick = () => {
    if (showOptionsMenuModal) {
      setMenuState("exiting");
      setInputState("entering");
      setTimeout(() => {
        setShowOptionsMenuModal(false);
        setShowInput(true);
      }, 300);
    } else {
      setTimeout(() => {
        setShowOptionsMenuModal(true);
        setShowInput(false);
      }, 300);
      setMenuState("entering");
      setInputState("exiting");
    }
  };

  const handleEndChat = () => {
    // Cancel any pending message requests
    cancelPendingRequests();
    setRoomId(null);
    setMessages([]);
    setIsLoading(false); // Reset loading state to prevent the loading indicator from showing in the new chat
    setMenuState("exiting");
    setInputState("entering");
    setTimeout(() => {
      setShowOptionsMenuModal(false);
      setShowInput(true);
    }, 300);
  };

  const handleDownloadTranscript = () => {
    // Create transcript content as text
    const timestamp = new Date().toLocaleString();
    let transcriptContent = `Chat Transcript with ${botName}\n`;
    transcriptContent += `Generated on: ${timestamp}\n\n`;
    transcriptContent += `${botName}: Hey there! 👋🏾\n`;
    transcriptContent += `${botName}: Hello, I am Kaia AI Agent, simply ask me a question! Anything is welcomed!\n\n`;

    // Add all message history
    messages.forEach((msg) => {
      const sender = msg.type === "chatbot" ? botName : "You";
      transcriptContent += `${sender}: ${msg.text}\n\n`;
    });

    const blob = new Blob([transcriptContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    // Create download link and trigger download
    const downloadLink = document.createElement("a");
    downloadLink.href = url;
    downloadLink.download = `${botName}_Transcript_${new Date()
      .toISOString()
      .slice(0, 10)}.txt`;
    document.body.appendChild(downloadLink);
    downloadLink.click();

    // Clean up
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(url);

    // Close the options menu
    setMenuState("exiting");
    setInputState("entering");
    setTimeout(() => {
      setShowOptionsMenuModal(false);
      setShowInput(true);
    }, 300);
  };

  const handleMessageSend = async () => {
    if (!inputText.trim()) return;

    let currentRoomId = roomId;

    if (!currentRoomId) {
      currentRoomId = uuidv4();
      setRoomId(currentRoomId);
    }

    const userMessage = {
      type: "user",
      text: inputText,
    };
    setMessages((prev) => [...prev, userMessage]);

    setInputText("");
    setIsLoading(true);

    const result = await sendChatMessage(inputText, currentRoomId, apiBaseUrl);
    
    // Only add the response message if the request wasn't aborted
    if (result !== null) {
      setMessages((prev) => [
        ...prev,
        {
          type: result.success ? "chatbot" : "chatbot failed",
          text: result.response,
        },
      ]);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleCopyCode = (e, codeContent) => {
    const button = e.currentTarget;
    navigator.clipboard.writeText(codeContent)
      .then(() => {
        button.classList.add('copied');
        setTimeout(() => {
          button.classList.remove('copied');
        }, 5000);
      })
      .catch(err => {
        console.error('Failed to copy text: ', err);
      });
  };

  return (
    <>
      <button
        className={`chat-button 
          ${isOnline ? "online" : "offline"} 
          ${isChatOpen ? "open" : "close"}`}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        aria-label={isChatOpen ? "Close chat" : "Open chat"}
      >
        {isOnline ? (
          <img
            src={isChatOpen ? closeIcon : onlineIcon}
            alt="Online Chat icon"
            className={iconState}
          />
        ) : (
          <img
            src={offlineIcon}
            alt="Offline Chat icon"
            className={iconState}
          />
        )}
      </button>

      {showTooltip && !isOnline && (
        <div className="tooltip">
          {botName} is on a quick coffee break! ☕ Don't worry, I'll be back soon.
        </div>
      )}

      {isChatOpen && isOnline && (
        <div className={`chatbot-modal ${iconState}`}>
          <div className="chatbot-header">
            <div className="chatbot-info">
              <img
                src={onlineIcon}
                style={{ width: "29.4px", height: "35.114px", flexShrink: 0 }}
                alt={`${botName} Logo`}
              />
              <span>{botName}</span>
            </div>
            <button className="options-icon" aria-label="Options">
              <img
                src={optionsIcon}
                alt="Options Icon"
                onClick={handleOptionsOnClick}
              />
            </button>
          </div>

          <div className="chatbot-content">
            <p className="tnc" style={{ marginBottom: "6px" }}>
              TnC applied
            </p>

            <div className="chatbot message">
              <p>Hey there! 👋🏾</p>
            </div>
            <div className="chatbot message">
              <p>
                Hello, I am {botName}, simply ask me a question! Anything is
                welcomed!
              </p>
            </div>

            {messages.map((message, index) => (
              <React.Fragment key={index}>
                {index === messages.length - 1 && (
                  <div ref={messagesEndRef} style={{ display: "hidden" }} />
                )}
                <div className={`${message.type} message`}>
                  <ReactMarkdown
                    allowedElements={[
                      "p",
                      "a",
                      "strong",
                      "em",
                      "code",
                      "pre",
                      "h1",
                      "h2",
                      "h3",
                      "h4",
                      "h5",
                      "h6",
                      "ul",
                      "ol",
                      "li",
                      "table",
                      "thead",
                      "tbody",
                      "tr",
                      "th",
                      "td",
                    ]}
                  >
                    {message.text}
                  </ReactMarkdown>
                </div>
              </React.Fragment>
            ))}
            {isLoading && (
              <div className="chatbot message">
                <LoadingDots />
              </div>
            )}
          </div>

          {showInput && !showOptionsMenuModal && (
            <div className={`chatbot-input ${inputState}`}>
              <textarea
                placeholder="Write your message"
                aria-label="Type your message"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    if (e.shiftKey) {
                      return;
                    } else {
                      e.preventDefault();
                      handleMessageSend();
                    }
                  }
                }}
                disabled={isLoading}
                rows={1}
              />
              <button
                className="send-button"
                aria-label="Send"
                onClick={handleMessageSend}
                disabled={isLoading}
              >
                <div className="send-button-background">
                  <img
                    src={isLoading ? sendButtonDisabled : sendButton}
                    alt="Send"
                  />
                </div>
              </button>
            </div>
          )}

          {!showInput && showOptionsMenuModal && (
            <div className={`menu-modal ${menuState}`}>
              <button onClick={handleDownloadTranscript}>
                <img src={emailIcon} alt="Download Transcript" />
                <span>Download Transcript</span>
              </button>
              <button onClick={handleEndChat}>
                <img src={endChatIcon} alt="End Chat" />
                <span style={{ color: "#E85B56" }}>
                  End the chat and Start a new chat
                </span>
              </button>
            </div>
          )}
        </div>
      )}
      </>
  );
};

export default ChatbotWidget;
