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
        // tncURL="YOUR_TERMS_URL"             // OPTIONAL
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
| `tncURL` | string | null | Optional URL for terms and conditions. When provided, shows a clickable "TnC applied" link that opens the URL in a new tab |
| `xLocation` | string | "44px" | X position of chat button (desktop) |
| `yLocation` | string | "44px" | Y position of chat button (desktop) |
| `mobileXLocation` | string | "25px" | X position of chat button (mobile) |
| `mobileYLocation` | string | "25px" | Y position of chat button (mobile) |

## Features

The ChatbotWidget includes the following features:

- **Online/offline status indicator** - Shows real-time backend availability with visual indicators
- **Responsive design** - Optimized for both desktop and mobile devices
- **Customizable positioning** - Adjustable chat button placement for desktop and mobile
- **Welcome message** - Personalized greeting with bot name placeholder support
- **Terms and conditions** - Optional clickable TnC link that opens in a new tab
- **Markdown support** - Rich text formatting for bot responses including tables, lists, and code blocks
- **Chat persistence** - Automatic saving and restoration of chat history using localStorage
- **Transcript download** - Export chat conversations as text files
- **Session management** - End current chat and start fresh conversations
- **Real-time typing indicator** - Shows when the bot is processing responses
- **Keyboard shortcuts** - Enter to send, Shift+Enter for new lines
- **Touch device support** - Enhanced mobile experience with touch-friendly interactions
- **Accessibility** - ARIA labels and keyboard navigation support

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

### Chat Persistence

The component automatically saves chat history to the browser's localStorage, including:
- Room ID for maintaining conversation context
- Complete message history between user and bot
- Session restoration on page reload

Chat data is cleared when using the "End Chat" option from the options menu.

### Supported Markdown Elements

The chatbot supports rich text formatting in responses, including:
- **Text formatting**: Bold, italic, inline code
- **Headings**: H1 through H6
- **Lists**: Ordered and unordered lists
- **Links**: Clickable hyperlinks
- **Tables**: Structured data display
- **Code blocks**: Syntax-highlighted code snippets
- **Paragraphs**: Standard text formatting

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
