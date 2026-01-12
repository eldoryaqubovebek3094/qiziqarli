const words = [
  "BOLAJON",
  "OLMA",
  "QALAMPIR",
  "DARAJA",
  "KITOB",
  "MAKTAB",
  "DO'STLIK",
  "O'YIN",
  "TABASSUM",
  "ILM",
  "TA'LIM",
  "O'QITUVCHI",
  "O'QITISH",
  "FAN",
  "JAVOB",
  "SAVOL",
  "YORIQNOMA",
  "BILIM",
  "MATEMATIKA",
  "GEOGRAFIYA",
  "TARIX",
  "FIZIKA",
  "KIMYO",
  "BIOLOGIYA",
  "INFORMATIKA",
  "DUNYO",
  "KOSMOS",
  "YER",
  "OY",
  "TABIAT",
  "HAYVONOT",
  "O'SIMLIK",
  "O'ZBEKISTON"
];

let currentLetterIndex = 0;
let topNumbers = [];

function randomColor() {
  return `hsl(${Math.floor(Math.random() * 360)}, 70%, 70%)`;
}

function prepareWord() {
  const word = words[Math.floor(Math.random() * words.length)];
  currentLetterIndex = 0;

  const game = document.getElementById("game");
  const pad = document.getElementById("numberPad");
  const result = document.getElementById("resultHarf");

  game.innerHTML = "";
  pad.innerHTML = "";
  result.textContent = "";

  const N = word.length;
  let numbers = [...Array(N).keys()].map(i => i + 1);

  // Yuqoridagi harflar uchun random raqam
  topNumbers = [...numbers].sort(() => Math.random() - 0.5);

  // Yuqoridagi harflar
  word.split("").forEach((ltr, i) => {
    const box = document.createElement("div");
    box.className = "letter-box";
    box.dataset.number = topNumbers[i];
    box.style.backgroundColor = randomColor();
    box.innerHTML = `${ltr}<span style="color:#000">${topNumbers[i]}</span>`;
    game.appendChild(box);
  });

  // Pastdagi tugmalar: shu raqamlar random tartibda
  const shuffledNumbers = [...numbers].sort(() => Math.random() - 0.5);
  shuffledNumbers.forEach(n => {
    const btn = document.createElement("button");
    btn.textContent = n;
    btn.style.backgroundColor = randomColor();
    btn.style.color = "#000";
    btn.onclick = () => checkNumber(n, btn);
    pad.appendChild(btn);
  });
}

function checkNumber(n, btn) {
  const boxes = document.querySelectorAll(".letter-box");
  const currentBox = boxes[currentLetterIndex];
  const expectedNumber = Number(currentBox.dataset.number);

  if (n === expectedNumber) {
    currentBox.classList.add("active"); // Yorqinlashadi
    btn.disabled = true;
    btn.classList.add("used");

    currentLetterIndex++;

    if (currentLetterIndex >= boxes.length) {
      showSuccess();
      setTimeout(prepareWord, 1500); // Keyingi so‘z
    }
  } else {
    showError();
  }
}

function showSuccess() {
  const r = document.getElementById("resultHarf");
  r.textContent = "🎉 A’lo! Hammasi to‘g‘ri!";
  r.className = "success";
}

function showError() {
  const r = document.getElementById("resultHarf");
  r.textContent = "❌ Xato! To‘g‘ri raqamni bos!";
  r.className = "error";
}

// O‘yinni ishga tushurish
prepareWord();
