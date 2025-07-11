const express = require("express");
const cors = require("cors");
const fs = require("fs");
const dotenv = require("dotenv");
const axios = require("axios");

dotenv.config();

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const aboutMe = fs.readFileSync("aboutme.txt", "utf8");

app.post("/chat", async (req, res) => {
  const { message } = req.body;

  try {
    const response = await axios.post(
        `${process.env.OPENAI_API_BASE_URL}/chat/completions`,
        {
            model: "gpt-4o",
            messages: [
            {
                role: "system",
                content: `Kamu adalah asisten pribadi dari Indra Juliansyah Putra. Berikut ini informasi tentang dia:\n\n${aboutMe}\n\nJawablah semua pertanyaan tentang Indra dengan jelas, profesional, dan informatif. Gunakan sudut pandang orang ketiga. Misalnya, gunakan kata 'Indra' bukan 'saya'.`
            },
            {
                role: "user",
                content: message,
            },
            ],
        },
        {
            headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            },
        }
        );

    const reply = response.data.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    console.error("OpenAI API error:", error?.response?.data || error.message);
    res.status(500).json({ reply: "Maaf, terjadi kesalahan saat menjawab." });
  }
});

app.listen(port, () => {
  console.log(`Chat server running on http://localhost:${port}`);
});
