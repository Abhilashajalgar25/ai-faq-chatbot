async function sendMessage() {

  const input = document.getElementById("userInput");
  const chatbox = document.getElementById("chatbox");

  const userMessage = input.value;

  chatbox.innerHTML += `<p><b>You:</b> ${userMessage}</p>`;

  const response = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyC_TT2RaaagxiwF1EcoHosxnN7oemhGd2k",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: userMessage }]
        }]
      })
    }
  );

  const data = await response.json();

  const botReply =
    data.candidates[0].content.parts[0].text;

  chatbox.innerHTML += `<p><b>Bot:</b> ${botReply}</p>`;

  input.value = "";
}
