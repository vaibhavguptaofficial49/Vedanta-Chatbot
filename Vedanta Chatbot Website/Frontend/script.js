const Notfound = "You are not ready for the solution I have, my son !";
const endpoint = "https://827a-34-151-81-172.ngrok-free.app";
const element = (selector) => window.document.querySelector(selector);
const Answer = async (Main, Text) => {
  text = Text.toLowerCase();
  let bodyObj = {};
  bodyObj["question"] = text;
  showTyping(Main);
  fetch(endpoint + "/predict", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bodyObj),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Server error: " + response.status);
      }
      return response.json();
    })
    .then((data) => {
      hideTyping();
      addAnswer(Main, data.answer);
    })
    .catch((error) => {
      console.error("Fetch error:", error);
      hideTyping();
      addAnswer(Main, Notfound);
    });
};

const addQuestion = (Main, text) => {
  Main.innerHTML += `
    <div class="row">
      <div class="chat question shadow">${text}</div>
    </div>`;
};
const addAnswer = (Main, text) => {
  const formattedText = text.replace(/\n/g, "<br>");
  Main.innerHTML += `
    <div class="row">
      <div class="chat answer shadow">${formattedText}</div>
    </div>`;
};

window.document.addEventListener("DOMContentLoaded", () => {
  const Main = element("main");
  const Askbtn = element("button");
  const Question = element("input");
  const Lastdiv = element("#last");
  addAnswer(
    Main,
    `Hello Parth, Shri Krishna this side. What guidance are you willing to seek today ?`
  );
  Question.focus();
  const Ask = () => {
    const Text = Question.value;
    if (Text.length) {
      addQuestion(Main, Text);
      Question.value = "";
      Answer(Main, Text);
      Lastdiv.scrollIntoView();
    }
  };
  Askbtn.addEventListener("click", Ask);
  Question.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) Ask();
  });
});

const showTyping = (Main) => {
  Main.innerHTML += `
    <div class="row typing" id="typingIndicator">
      <div class="chat answer shadow">
        <div class="container">
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
        </div>
      </div>
    </div>`;
};

const hideTyping = () => {
  const typing = document.getElementById("typingIndicator");
  if (typing) {
    typing.remove();
  }
};
