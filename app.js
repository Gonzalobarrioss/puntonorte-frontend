let userId = localStorage.getItem("userId");

if (!userId) {

  userId = crypto.randomUUID();

  localStorage.setItem(
    "userId",
    userId
  );

}

async function sendMessage() {

  const input = document.getElementById("userInput");

  const chatBox = document.getElementById("chatBox");

  const message = input.value;

  if (!message) return;

  // mensaje usuario

  const userMessage = document.createElement("div");

  userMessage.classList.add(
    "message",
    "user"
  );

  userMessage.innerText = message;

  chatBox.appendChild(userMessage);

  input.value = "";

  // typing loader

  const typingMessage = document.createElement("div");

  typingMessage.classList.add(
    "message",
    "bot"
  );

  typingMessage.innerHTML = `
    <div class="typing">
      <span></span>
      <span></span>
      <span></span>
    </div>
  `;

  chatBox.appendChild(typingMessage);

  chatBox.scrollTop =
    chatBox.scrollHeight;

  // request backend

  const response = await fetch(
    "https://puntonorte-ai.onrender.com/chat",
    {

      method: "POST",

      headers: {
        "Content-Type":
          "application/json",
      },

      body: JSON.stringify({
        message: message,
        userId: userId,
      }),

    }
  );

  const data = await response.json();

  typingMessage.remove();

  // respuesta bot

  const botMessage =
    document.createElement("div");

  botMessage.classList.add(
    "message",
    "bot"
  );

  botMessage.innerText =
    data.reply;

  chatBox.appendChild(botMessage);

  chatBox.scrollTop =
    chatBox.scrollHeight;

}

const input =
  document.getElementById(
    "userInput"
  );

input.addEventListener(
  "keypress",
  function(event) {

    if (event.key === "Enter") {

      sendMessage();

    }

  }
);