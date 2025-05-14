import React from "react";
import ChatbotWidget from "./components/ChatbotWidget";
import "./index.css";

const App = () => {
  // Define the API base URL for local development/testing
  // Set to your local API endpoint, or null to use the relative path default
  const localApiBaseUrl = "http://localhost:3001"; // Or null

  return (
      <ChatbotWidget 
      apiBaseUrl={localApiBaseUrl}     // REQUIRED
      // botName="my bot"                 OPTIONAL
      // xLocation="10px"                 OPTIONAL
      // yLocation="10px"                 OPTIONAL 
      // mobileXLocation="20px"           OPTIONAL
      // mobileYLocation="12px"           OPTIONAL
      />
  );
};

export default App;
