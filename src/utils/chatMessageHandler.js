export const sendChatMessage = async (inputText, roomId, baseUrl) => {
  try {

    const endpoint = `${baseUrl}/message`;

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: inputText,
        roomId: roomId,
      }),
    });

    const result = await response.json();

    return {
      success: result.success,
      response: result.data,
    };
  } catch (error) {
    return {
      success: false,
      response: "Sorry, I encountered an error. Please try again.",
    };
  }
};
