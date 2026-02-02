const axios = require("axios");

const aboutMe = `
Indra Juliansyah Putra adalah seorang lulusan Teknik Informatika dari Universitas Sriwijaya dengan IPK 3.91/4.00. Ia lahir di Tangerang pada 28 Juli 2003 dan berdomisili di Palembang. Ia dikenal sebagai pribadi yang disiplin, tekun, dan memiliki semangat tinggi dalam bidang teknologi, khususnya data science, machine learning, dan pengembangan kecerdasan buatan.

Riwayat pendidikan formalnya meliputi:
- Universitas Sriwijaya (2021–2025), Teknik Informatika
- SMAN Sumatera Selatan (2018–2021), jurusan MIPA dengan nilai akhir 92.44/100
- SMPN 1 Muara Pinang (2015–2018)
- SDN 03 Muara Pinang (2010–2015)
- SDN Ciputat 05 (2009–2010)

Ia juga mengikuti pelatihan bergengsi seperti:
- Bangkit Academy 2023 (Machine Learning Cohort)
- Google Data Analytics oleh Startup Campus x Google Career Certificate

Dalam bidang profesional, Indra pernah menjadi Asisten Laboratorium di Lab Pengenalan Pola & Pengolahan Citra Fasilkom Unsri (Agustus–Desember 2024), serta aktif dalam organisasi sebagai anggota Machine Learning team GDSC Unsri (2023–2024), Wakil Ketua ROHIS ROMANSA (2019–2020), Wakil Ketua OSIS SMP (2016–2017), dan Pradana Pramuka (2017–2018).

Proyek unggulan yang pernah ia kerjakan:
1. **Klasifikasi Citra Kue Tradisional menggunakan CNN** – Mencapai akurasi 97% dengan model VGG19 dan Xception, mengungguli penelitian sebelumnya.  
   Repo: https://github.com/indraJuliansyahPutra/Klasifikasi-Kue-CNN

2. **ASL Hand Gesture Detection dengan YOLOv8** – Membangun sistem real-time pengenalan gerakan tangan menggunakan YOLOv8 dan OpenCV.  
   Repo: https://github.com/indraJuliansyahPutra/ASL-Hand-Gesture-Recognition

3. **Dashboard Liga 1 Indonesia** – Scraping dan analisis data 550+ pemain sepak bola dari Liga 1 Indonesia, divisualisasikan dalam Power BI.  
   Repo: https://github.com/indraJuliansyahPutra/Liga-1-Indonesia

4. **Dashboard BPS Sumatera Selatan** – Visualisasi data resmi dari BPS Sumsel dalam Tableau, mencakup topik kependudukan, ekonomi, kesehatan, dan sosial.  
   Link: https://public.tableau.com/app/profile/indra.juliansyah.putra/viz/DashboardBPSSumateraSelatan/Kependudukan

Indra juga telah mengantongi banyak sertifikasi, di antaranya:
- TensorFlow Developer Certificate (2024–2027)
- Google Data Analytics (2023)
- DeepLearning.AI TensorFlow Developer & Machine Learning (2023)
- Mathematics for ML & Data Science – DeepLearning.ai
- Dicoding: Data Scientist (2023–2024), Machine Learning Engineer (2022–2025)

Untuk menghubungi Indra:
- Email: indra.juliansyah.putra.career@gmail.com
- Telepon: (+62) 81273415726 / (+62) 81541114284

Indra juga aktif membagikan tulisan-tulisan edukatif di Medium dan GitHub:
- Medium: https://medium.com/@mrindrajuliansyahputra10
- GitHub: https://github.com/indraJuliansyahPutra
`;


exports.handler = async function (event, context) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: "Method Not Allowed",
    };
  }

  const { message } = JSON.parse(event.body);

  // Konten prompt
  const systemPrompt = `Kamu adalah asisten pribadi dari Indra Juliansyah Putra. Berikut ini informasi tentang dia:\n\n${aboutMe}\n\nJawablah semua pertanyaan tentang Indra dengan jelas, profesional, dan informatif. Gunakan sudut pandang orang ketiga. Misalnya, gunakan kata 'Indra' bukan 'saya'.`;

  // Coba pakai OpenAI API dulu
  try {
    const response = await axios.post(
      `${process.env.OPENAI_API_BASE_URL}/chat/completions`,
      {
        model: "gpt-4o",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message },
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
  } catch (openaiError) {
    console.error("OpenAI API error. Coba fallback ke Groq...");

    // Fallback ke Groq
    try {
      const baseUrl = process.env.GROQ_API_BASE_URL.replace(/\/+$/, "");
      const response = await axios.post(`${baseUrl}/chat/completions`,
        {
          model: "llama-3.1-8b-instant",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: message },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          },
        }
      );

      const reply = response.data.choices[0].message.content;
      return {
        statusCode: 200,
        body: JSON.stringify({ reply }),
      };
    } catch (groqError) {
      console.error("Groq API error:", groqError?.response?.data || groqError.message);
      return {
        statusCode: 500,
        body: JSON.stringify({ reply: "Maaf, tidak dapat menjawab sekarang. Silakan coba lagi nanti." }),
      };
    }
  }
};