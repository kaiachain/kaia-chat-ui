// Track active API requests
let activeController = null;

export const sendChatMessage = async (inputText, roomId, baseUrl, agentId) => {
  try {
    // Cancel any existing request
    if (activeController) {
      activeController.abort();
    }

    // Create a new AbortController for this request
    activeController = new AbortController();
    const signal = activeController.signal;

    // Construct endpoint based on whether agentId is provided
    const endpoint = agentId ? `${baseUrl}/${agentId}/message` : `${baseUrl}/message`;

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: inputText,
        roomId: roomId,
      }),
      signal: signal,
    });

    const result = await response.json();

    // Clear the controller when done
    activeController = null;

    return {
      success: result.success,
      response: result.data,
    };
  } catch (error) {
    // If the request was aborted, return null
    if (error.name === 'AbortError') {
      return null;
    }
    
    return {
      success: false,
      response: "Sorry, I encountered an error. Please try again.",
    };
  }
};

// Function to cancel any pending request
export const cancelPendingRequests = () => {
  if (activeController) {
    activeController.abort();
    activeController = null;
  }
};
