import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash"
});

app.post("/api/insights", async (req, res) => {
  try {
    const { data } = req.body;

    if (!Array.isArray(data)) {
      return res.status(400).json({ error: "Invalid input" });
    }

    const prompt = `
Analyze the following feedback:

${data.join("\n")}

Return:
1. Top 3 themes
2. 3 representative quotes
3. 3 suggested actions
`;

    const result = await model.generateContent(prompt);
    res.json({ result: result.response.text() });

  } catch (err) {
    console.error("Gemini error:", err);
    res.status(500).json({ error: "Summarization failed" });
  }
});

app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});
