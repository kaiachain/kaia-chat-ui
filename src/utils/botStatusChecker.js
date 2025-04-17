/**
 * Function to check if the chatbot is online by making a GET request
 * @param {string | null | undefined} baseUrl The base URL for the API endpoint. If null/undefined, uses relative path.
 * @returns {Promise<boolean>} Promise resolving to true if bot is active, false otherwise
 */
export const checkBotStatus = async (baseUrl) => {
  try {
    // Use provided baseUrl or default to relative path
    const endpoint =`${baseUrl}/health`;

    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });
    
    if (!response.ok) {
      console.warn('Bot status check failed with status:', response.status);
      return false;
    }
    
    const data = await response.json();
    // Check if the response has a status field with value "ok"
    return data.status === "ok";
  } catch (error) {
    console.error('Error checking bot status:', error);
    return false;
  }
};

/**
 * Sets up a periodic check of the bot status
 * @param {Function} setIsOnline Callback function to update online status state
 * @param {string | null | undefined} baseUrl The base URL for the API endpoint.
 * @param {number} intervalMs Interval in milliseconds between checks
 * @returns {Function} Function to clear the interval when needed
 */
export const setupBotStatusChecker = (setIsOnline, baseUrl, intervalMs = 30000) => {
  // Initial check
  checkBotStatus(baseUrl).then(setIsOnline);
  
  // Setup interval for periodic checking
  const intervalId = setInterval(() => {
    checkBotStatus(baseUrl).then(setIsOnline);
  }, intervalMs);
  
  // Return cleanup function
  return () => clearInterval(intervalId);
};
