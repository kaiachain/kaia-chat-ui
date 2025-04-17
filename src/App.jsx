import React from "react";
import ChatbotWidget from "./components/ChatbotWidget";
import "./index.css";

const App = () => {
  // Define the API base URL for local development/testing
  // Set to your local API endpoint, or null to use the relative path default
  const localApiBaseUrl = "http://localhost:3001"; // Or null

  return (
      <ChatbotWidget apiBaseUrl={localApiBaseUrl} />
  );
};

export default App;
