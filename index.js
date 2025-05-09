// Import required modules
const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const cors = require("cors"); 

// Initialize the Express app
const app = express();
const PORT = 3000; 

// Middleware setup
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json()); // Parse incoming JSON request bodies

// Route: Fetch Models from LM Studio
app.get("/v1/models", async (req, res) => {
  try {
    // Make a GET request to the LM Studio API to fetch available models
    const response = await axios.get('http://localhost:11434/v1/models');
    
    // Respond with a formatted list of models
    res.json({
      object: "list",
      data: response.data.models.map(model => ({
        id: model.id, // Model ID
        object: "model", // Object type
        owned_by: model.owned_by || "local", // Owner of the model (default: "local")
      })),
    });
  } catch (error) {
    console.error("Error fetching models:", error.message);
    res.status(500).json({ error: "Failed to fetch models from LM Studio" });
  }
});

// Route: Chat Completion Endpoint
app.post("/v1/chat/completions", async (req, res) => {
  // Extract parameters from the request body
  const { model, messages, temperature = 0.8 } = req.body;

  try {
    // Make a POST request to the LM Studio API for chat completion
    const response = await axios.post('http://localhost:11434/api/chat', {
      model: model, 
      messages: messages, 
      options: {
        temperature: temperature, 
      },
      stream: false, // Disable streaming responses
    });

    // Extract the assistant's reply from the API response
    const reply = response.data.message.content;

    // Respond with a formatted chat completion object
    res.json({
      id: "chatcmpl-" + Math.random().toString(36).substring(7), // Unique ID for the response
      object: "chat.completion", // Object type
      created: Math.floor(Date.now() / 1000), // Timestamp of the response
      model: model, // Model used for the response
      choices: [
        {
          index: 0, // Index of the choice
          message: {
            role: "assistant", // Role of the responder
            content: reply, // Assistant's reply
          },
          finish_reason: "stop", // Reason for completion
        },
      ],
      usage: {
        prompt_tokens: 0, // Placeholder for prompt token count
        completion_tokens: 0, // Placeholder for completion token count
        total_tokens: 0, // Placeholder for total token count
      },
    });

  } catch (err) {
    console.error("Error during chat completion:", err.message);
    res.status(500).json({ error: "Failed to call LM Studio API" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 MCP server running at http://localhost:${PORT}`);
});
