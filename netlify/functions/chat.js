const axios = require("axios");

const aboutMe = `
Indra Juliansyah Putra adalah seorang lulusan Teknik Informatika yang aktif dalam bidang Data Science dan Kecerdasan Buatan. Ia memiliki pengalaman dalam proyek klasifikasi citra, analisis sentimen, serta dashboard visualisasi interaktif. Selain itu, ia juga menulis di Medium, berpartisipasi dalam bootcamp, dan aktif dalam komunitas teknologi.
`;

exports.handler = async function (event, context) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: "Method Not Allowed",
    };
  }

  const { message } = JSON.parse(event.body);

  try {
    const response = await axios.post(
      `${process.env.OPENAI_API_BASE_URL}/chat/completions`,
      {
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: `Kamu adalah asisten pribadi dari Indra Juliansyah Putra. Berikut ini informasi tentang dia:\n\n${aboutMe}\n\nJawablah semua pertanyaan tentang Indra dengan jelas, profesional, dan informatif. Gunakan sudut pandang orang ketiga. Misalnya, gunakan kata 'Indra' bukan 'saya'.`,
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

    return {
      statusCode: 200,
      body: JSON.stringify({ reply }),
    };
  } catch (error) {
    console.error("OpenAI API error:", error?.response?.data || error.message);

    return {
      statusCode: 500,
      body: JSON.stringify({ reply: "Maaf, terjadi kesalahan saat menjawab." }),
    };
  }
};
