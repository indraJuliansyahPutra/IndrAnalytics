export function initChatBot() {
  const chatButton = document.getElementById("chatButton");
  const chatWidget = document.getElementById("chatWidget");
  const chatBody = document.getElementById("chatBody");
  const chatInput = document.getElementById("chatInput");
  const chatSend = document.getElementById("chatSend");

  chatButton.addEventListener("click", () => {
    chatWidget.classList.toggle("hidden");
  });

  chatSend.addEventListener("click", sendMessage);
  chatInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
  });

  async function sendMessage() {
    const text = chatInput.value.trim();
    if (!text) return;

    const userMsg = document.createElement("div");
    userMsg.className = "user-message";
    userMsg.innerText = text;
    chatBody.appendChild(userMsg);
    chatInput.value = "";
    chatBody.scrollTop = chatBody.scrollHeight;

    // Kirim ke server
    try {
      console.log("Kirim pertanyaan ke backend:", text);
      const response = await fetch("/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      const data = await response.json();

      const botMsg = document.createElement("div");
      botMsg.className = "bot-message";
      botMsg.innerText = data.reply;
      chatBody.appendChild(botMsg);
      chatBody.scrollTop = chatBody.scrollHeight;
    } catch (error) {
      const errorMsg = document.createElement("div");
      errorMsg.className = "bot-message";
      errorMsg.innerText = "Maaf, tidak dapat menjawab sekarang.";
      chatBody.appendChild(errorMsg);
    }
  }
}
