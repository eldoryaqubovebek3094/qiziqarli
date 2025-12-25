let currentLevel = 1;
const totalLevels = 10;
const questionsPerLevel = 10;
const questions = [];
const basicOperators = ["+", "-"];
const allOperators = ["+", "-", "*"];

function computeAnswer(n1, op, n2) {
  switch (op) {
    case "+": return n1 + n2;
    case "-": return n1 - n2;
    case "*": return n1 * n2;
    case "/": return n2 !== 0 ? n1 / n2 : null;
    default: return null;
  }
}

// Timer and progress settings
const timerDuration = 60; // seconds per level
let timerInterval = null;
let remainingTime = timerDuration;

function loadCompletedLevels() {
  try {
    const raw = localStorage.getItem('completedLevels');
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function saveCompletedLevels(arr) {
  try {
    localStorage.setItem('completedLevels', JSON.stringify(arr));
  } catch (e) {}
}

function markLevelCompleted(level) {
  const arr = loadCompletedLevels();
  if (!arr.includes(level)) {
    arr.push(level);
    saveCompletedLevels(arr);
    updateProgressList();
  }
}

function updateProgressList() {
  const list = document.getElementById('progress-list');
  if (!list) return;
  const arr = loadCompletedLevels();
  list.innerHTML = '';
  arr.sort((a, b) => a - b).forEach(l => {
    const li = document.createElement('li');
    li.textContent = `Bosqich ${l}`;
    list.appendChild(li);
  });
}

function generateQuestions(level) {
  questions.length = 0;
  for (let i = 0; i < questionsPerLevel; i++) {
    let num1, num2, operator;

    if (level === 1) {
      num1 = Math.floor(Math.random() * 9) + 1;
      num2 = Math.floor(Math.random() * 9) + 1;
      operator = basicOperators[Math.floor(Math.random() * basicOperators.length)];
    } else if (level === 2) {
      num1 = Math.floor(Math.random() * 90) + 10;
      num2 = Math.floor(Math.random() * 90) + 10;
      operator = basicOperators[Math.floor(Math.random() * basicOperators.length)];
    } else if (level === 3) {
      num1 = Math.floor(Math.random() * 900) + 100;
      num2 = Math.floor(Math.random() * 900) + 100;
      operator = basicOperators[Math.floor(Math.random() * basicOperators.length)];
    } else {
      const scale = Math.pow(10, Math.min(3, Math.floor((level - 4) / 2) + 1));
      num1 = Math.floor(Math.random() * (9 * scale)) + 1;
      num2 = Math.floor(Math.random() * (9 * scale)) + 1;
      operator = allOperators[Math.floor(Math.random() * allOperators.length)];
    }

    if (operator === "-" && num1 < num2) [num1, num2] = [num2, num1];

    let question = `${num1} ${operator} ${num2} = ?`;
    questions.push({ question, answer: computeAnswer(num1, operator, num2) });
  }
}

function displayQuestions() {
  const questionsContainer = document.getElementById("questions");
  questionsContainer.innerHTML = "";
  questions.forEach((q, index) => {
    questionsContainer.innerHTML += `
      <div class="question">
        <span>${index + 1}) ${q.question}</span>
        <input step="any" type="number" id="answer${index}" oninput="checkAnswer(${index})" />
        <span id="status${index}" class="status"></span>
      </div>
    `;
  });
}

function checkAnswer(index) {
  const userAnswer = parseFloat(document.getElementById(`answer${index}`).value);
  const correctAnswer = questions[index].answer;
  const statusSpan = document.getElementById(`status${index}`);

  if (!isNaN(userAnswer)) {
    if (Math.abs(userAnswer - correctAnswer) < 1e-9) {
      statusSpan.innerHTML = "✅";
      statusSpan.style.color = "green";
    } else {
      statusSpan.innerHTML = "❌";
      statusSpan.style.color = "red";
    }
  } else {
    statusSpan.innerHTML = "";
  }
}

window.addEventListener("DOMContentLoaded", () => {
  const quizContainer = document.getElementById('quiz-container');
  if (!quizContainer) return;

  const submitBtn = document.getElementById("submit");
  const resultDiv = document.getElementById("result");
  const timerEl = document.getElementById('timer');
  const showAnswersBtn = document.getElementById('show-answers');
  const levelEl = document.getElementById("level");

  updateProgressList();
  generateQuestions(currentLevel);
  displayQuestions();
  if (levelEl) levelEl.innerText = currentLevel;

  function startTimer() {
    if (!timerEl) return;
    remainingTime = timerDuration;
    timerEl.innerText = `${remainingTime}s`;
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
      remainingTime--;
      timerEl.innerText = `${remainingTime}s`;
      if (remainingTime <= 0) {
        clearInterval(timerInterval);
        if (resultDiv) resultDiv.innerHTML = '<h1 class="incorrect">Vaqt tugadi — qaytadan urinib ko\'ring.</h1>';
      }
    }, 1000);
  }

  if (submitBtn) {
    submitBtn.addEventListener("click", () => {
      let allAnswered = true;
      let correctAnswers = 0;

      questions.forEach((q, index) => {
        const el = document.getElementById(`answer${index}`);
        const userAnswer = el ? parseFloat(el.value) : NaN;
        if (isNaN(userAnswer)) {
          allAnswered = false;
        } else {
          if (Math.abs(userAnswer - q.answer) < 1e-9) correctAnswers++;
        }
      });

      if (!allAnswered) {
        if (resultDiv) resultDiv.innerHTML = "<h1 class=\"incorrect\">Iltimos, barcha savollarga javob bering.</h1>";
        return;
      }

      if (correctAnswers === questionsPerLevel) {
        markLevelCompleted(currentLevel);
        if (currentLevel < totalLevels) {
          if (resultDiv) resultDiv.innerHTML = `<p>Tabriklaymiz! Bosqich ${currentLevel} muvaffaqiyatli yakunlandi.</p>`;
          currentLevel++;
          generateQuestions(currentLevel);
          displayQuestions();
          if (levelEl) levelEl.innerText = currentLevel;
          startTimer();
        } else {
          if (resultDiv) resultDiv.innerHTML = "<h1>Tabriklaymiz! Siz barcha bosqichlarni muvaffaqiyatli o'tdingiz!</h1>";
          clearInterval(timerInterval);
        }
      } else {
        if (resultDiv) resultDiv.innerHTML = `<h1 class=\"incorrect\">Noto'g'ri! To'g'ri javoblar: ${correctAnswers}/${questionsPerLevel}. Qaytadan urinib ko'ring.</h1>`;
      }
    });
  }

  if (showAnswersBtn) {
    showAnswersBtn.addEventListener('click', () => {
      questions.forEach((q, index) => {
        const status = document.getElementById(`status${index}`);
        if (status) {
          status.innerText = `Ans: ${q.answer}`;
          status.style.color = 'blue';
        }
      });
    });
  }

  startTimer();
});