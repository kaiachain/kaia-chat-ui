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
        apiBaseUrl="YOUR_BACKEND_API_URL"      // REQUIRED
        // agentId="YOUR_AGENT_ID"             // OPTIONAL
        // botName="YOUR_CHATBOT_NAME"         // OPTIONAL 
        // welcomeMessage="Hi, I am {botName}" // OPTIONAL
        // xLocation="44px"                    // OPTIONAL
        // yLocation="44px"                    // OPTIONAL
        // mobileXLocation="25px"              // OPTIONAL
        // mobileYLocation="25px"              // OPTIONAL
      />
    </div>
  );
}

export default App;

```

## Props

The ChatbotWidget component accepts the following props:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `apiBaseUrl` | string | **Required** | Base URL for the chatbot API |
| `agentId` | string | null | Optional ID to specify a specific agent/model |
| `botName` | string | "Kaia AI Agent" | Name of the chatbot |
| `welcomeMessage` | string | "Hello, I am {botName}, simply ask me a question! Anything is welcomed!" | Initial message shown when chat is opened. Add `{botName}` like shown in the example to dynamically add your Bot's name in the message. |
| `xLocation` | string | "44px" | X position of chat button (desktop) |
| `yLocation` | string | "44px" | Y position of chat button (desktop) |
| `mobileXLocation` | string | "25px" | X position of chat button (mobile) |
| `mobileYLocation` | string | "25px" | Y position of chat button (mobile) |

## Features

The ChatbotWidget includes the following features:

- Online/offline status indicator based on backend availability
- Responsive design for both desktop and mobile
- Welcome message with customizable text
- Markdown support for bot responses
- Option to download chat transcript
- Ability to end and start a new chat session
- Real-time typing indicator

### Backend API Response Format

The component expects the backend API endpoint provided in `apiBaseUrl` (e.g., `http://localhost:3001`) to handle POST requests to the `/message` path, or `/{agentId}/message` if an agent ID is provided.

The request will have a JSON body containing the user's message and the room ID:

```json
{
  "text": "User's message text",
  "roomId": "unique_room_identifier"
}
```

The endpoint should respond with a JSON object containing a success flag and an array of responses, where the first element contains the bot's reply text:

```json
{
  "success": true,
  "data": [
    { "text": "Bot's response text" }
  ]
}
```

If an error occurs, the response might look like:

```json
{
  "success": false,
  "data": "Error message or details"
}
```

### Health Check Endpoint

The component periodically checks a `/health` endpoint (relative to `apiBaseUrl`) using a GET request to verify the server's status and update the chat widget's online indicator. This endpoint is **required** for the component to correctly display the backend status. It must respond with the following JSON when the server is healthy:

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
