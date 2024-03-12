window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.interimResults = true;
recognition.continuous = true; // Add this line

document.querySelector("#start").addEventListener("click", () => {
  recognition.start();
});

document.querySelector("#stop").addEventListener("click", () => {
  recognition.stop();
});

recognition.addEventListener("result", (e) => {
  const transcript = Array.from(e.results)
    .map((result) => result[0])
    .map((result) => result.transcript)
    .join("");

  if (e.results[0].isFinal) {
    const word = transcript.split(" ").pop().toLowerCase();
    const letters = word.split("");
    const signsContainer = document.querySelector("#signsContainer");

    // Clear the container
    signsContainer.innerHTML = "";

    // Add each letter image to the container
    letters.forEach((letter) => {
      const img = document.createElement("img");
      img.src = `ISL images/${letter}.png`;
      img.alt = `Sign Language Image for ${letter}`;
      img.style.width = "200px";
      img.style.height = "200px";
      signsContainer.appendChild(img);
    });
  }
});
