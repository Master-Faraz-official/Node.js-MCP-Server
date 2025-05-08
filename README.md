# Model Communication Protocol Server

A simple **Node.js** server that acts as a proxy for interacting with **LM Studio** models.  
It provides two API endpoints:

- Fetch available models
- Perform chat completions

Built using **Express.js**, **Axios**, and **Body-parser**.

---

## 🚀 Features

- Fetch available models from LM Studio (`GET /v1/models`)
- Perform chat completions with selected models (`POST /v1/chat/completions`)
- Built-in CORS support for cross-origin API access
- Simple and easy to extend

---

## 📦 Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/master-faraz-official/mcp-server.git
   cd mcp-server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

---

## 🛠 Usage

1. Make sure **LM Studio** is running locally at `http://localhost:11434`.

2. Start the server:
   ```bash
   node index.js
   ```
   > The server will run at `http://localhost:3000`

---

## 📚 API Endpoints

### 1. Fetch Models

**GET** `/v1/models`

Fetches a list of available models from LM Studio.

**Example Response:**

```json
{
  "object": "list",
  "data": [
    {
      "id": "model-id-1",
      "object": "model",
      "owned_by": "local"
    }
  ]
}
```

### 2. Chat Completion

**POST** `/v1/chat/completions`

Send a chat conversation and get a model's response.

**Request Body:**

```json
{
  "model": "your-model-id",
  "messages": [{ "role": "user", "content": "Hello!" }],
  "temperature": 0.7
}
```

**Example Response:**

```json
{
  "id": "chatcmpl-abc123",
  "object": "chat.completion",
  "created": 1714150000,
  "model": "your-model-id",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "Hello! How can I assist you today?"
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 0,
    "completion_tokens": 0,
    "total_tokens": 0
  }
}
```

---

## ⚙️ Environment Details

- Node.js
- Express.js
- Axios
- Body-parser
- CORS

---

## 📄 Notes

- Ensure that **LM Studio** is running on your local machine (`localhost:11434`).
- The server acts as a bridge, formatting the responses in an OpenAI-compatible format.

---

## 📜 License

This project is open source and available under the [MIT License](LICENSE).
