import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import cors from "cors";

// Load environment variables
dotenv.config();

const app = express();
const port = 3000;
app.use(cors());

// Middleware to parse JSON body
app.use(bodyParser.json());

const genAI = new GoogleGenerativeAI(process.env.VITE_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.post("/generate-text", async (req, res) => {
  const prompt = req.body.prompt;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    // Make the request to Gemini API
    const result = await model.generateContent(prompt);

    // Send the generated text back to the client
    res.json({
      generatedText: result.response.text(),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while generating text" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
