# Kaia Chat UI

A simple chat UI component for people to use and import in their React codebase.

## Installation

Install the package using npm:

```bash
npm install @kaiachain/kaia-chat-ui 
```

## Usage

Import the `ChatbotWidget` component and its CSS, then use it in your React application:

```jsx
import { ChatbotWidget } from '@kaiachain/kaia-chat-ui';
import '@kaiachain/kaia-chat-ui/dist/kaia-chat-ui.css';

function App() {
  return (
    <div>
      <ChatbotWidget 
        apiBaseUrl="YOUR_CHATBOT_BACKEND_API" 
        botName="YOUR_CHATBOT_NAME"
      />
    </div>
  );
}

export default App;

```

### Backend API Response Format

The component expects the backend API endpoint provided in `apiBaseUrl` (e.g., `http://localhost:8080`) to handle POST requests to the `/message` path (so the full URL would be `http://localhost:8080/message`). The request should have a JSON body containing the user's message and the room ID:

```json
{
  "text": "User's message text",
  "roomId": "unique_room_identifier"
}
```

The endpoint should respond with a JSON object containing a success flag and the bot's reply data:

```json
{
  "success": true,
  "data": "Bot's response text"
}
```

If an error occurs, the response might look like:

```json
{
  "success": false,
  "data": "Error message or details"
}
```

Additionally, the component periodically checks a `/health` endpoint (relative to `apiBaseUrl`) using a GET request to verify the server's status and update the chat widget's online indicator. This endpoint is **required** for the component to correctly display the backend status. It must respond with the following JSON when the server is healthy:

```json
{
  "status": "ok"
}
```

Failure to respond correctly to the `/health` check will result in the component indicating that the bot is offline.

## Contributing

Please see [CONTRIBUTING.md](CONTRIBUTING.md) for details on how to contribute to this project.

## License

[MIT](LICENSE)
