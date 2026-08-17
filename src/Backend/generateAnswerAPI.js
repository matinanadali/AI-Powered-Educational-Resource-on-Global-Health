import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json()); // Built-in express JSON parser (no need for body-parser)

// 1. Initialize GoogleGenerativeAI with your API Key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY, {
  apiVersion: "v1", // Prevents the v1beta 404 error
});

app.post("/generate-text", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    // 2. Select the model
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // 3. Generate response using the correct prompt variable name
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    // 4. Send the generated text back using Express's res
    res.json({ generatedText: responseText });
  } catch (error) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: "An error occurred while generating text" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});