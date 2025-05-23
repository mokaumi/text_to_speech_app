const speakBtn = document.getElementById("speakBtn");
const textInput = document.getElementById("text");
const voiceList = document.getElementById("voiceList");
const rateInput = document.getElementById("rate");
const pitchInput = document.getElementById("pitch");
const rateValue = document.getElementById("rate-value");
const pitchValue = document.getElementById("pitch-value");

let synth = window.speechSynthesis;
let voices = [];

function populateVoices() {
  voices = synth.getVoices();
  voiceList.innerHTML = "";

  voices.forEach((voice, index) => {
    const option = document.createElement("option");
    option.textContent = `${voice.name} (${voice.lang})`;
    option.value = index;
    voiceList.appendChild(option);
  });
}

populateVoices();
if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoices;
}

// Update display values
rateInput.addEventListener("input", () => {
  rateValue.textContent = rateInput.value;
});

pitchInput.addEventListener("input", () => {
  pitchValue.textContent = pitchInput.value;
});

speakBtn.addEventListener("click", () => {
  const text = textInput.value.trim();
  if (!text) return;

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.voice = voices[voiceList.value];
  utterance.rate = parseFloat(rateInput.value);
  utterance.pitch = parseFloat(pitchInput.value);

  synth.speak(utterance);
});
