import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import themesRouter from "./themes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/themes", themesRouter);

const port = process.env.PORT || 3000;
const ai = new GoogleGenAI({"apiKey":process.env.GEMINI_API_KEY});

app.post("/insights", async (req, res) => {
  try {
    const { topThemes } = req.body;

    if (!topThemes) {
      return res.status(400).json({ error: "Invalid input" });
    }

    const prompt = `
Input Data: The following are the top 5 themes extracted from our latest data:
${topThemes.join("\n")}

Required Output:
1. SUMMARY: Provide a 2-sentence executive summary of these 5 themes.
2. SUGGESTED ACTIONS: Provide exactly 3 high-impact, actionable recommendations.
3. REPRESENTATIVE QUOTES: Generate 3 realistic quotes that embody the sentiment of these themes (ensure they sound like real user feedback).
Formatting: Use clear Markdown headings (###) and bullet points.
`;

    const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    });

    res.json({ result: response.text });

  } catch (err) {
    console.error("Gemini error:", err);
    res.status(500).json({ error: "Summarization failed" });
  }
});

app.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}`);
});