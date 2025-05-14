import React from "react";
import ChatbotWidget from "./components/ChatbotWidget";
import "./index.css";

const App = () => {
  // Define the API base URL for local development/testing
  // Set to your local API endpoint
  const localApiBaseUrl = "http://localhost:3001"; // Or null

  return (
      <ChatbotWidget 
      apiBaseUrl={localApiBaseUrl}                 // REQUIRED
      // botName="YOUR_BOT_NAME"                   // OPTIONAL
      // welcomeMessage="Hi, I am {botName}"       // OPTIONAL
      // xLocation="10px"                          // OPTIONAL
      // yLocation="10px"                          // OPTIONAL 
      // mobileXLocation="20px"                    // OPTIONAL
      // mobileYLocation="12px"                    // OPTIONAL
      // agentId="YOUR_ELIZA_AGENT_ID"             // OPTIONAL
      />
  );
};

export default App;
