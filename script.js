<<<<<<< HEAD
=======
document.addEventListener("contextmenu", function (event) {
  event.preventDefault();
});

document.addEventListener("keydown", function (event) {
  if (event.key === "F12" || event.key === "Escape") {
    event.preventDefault();
  }
});

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        event.preventDefault();
    }
});

const modal = document.getElementById("myModal");
// const btn = document.getElementById("openModal");
const span = document.getElementsByClassName("close")[0];




>>>>>>> d06f821b2ab7a10305761135363c908f134f77db
let currentLevel = 1;
const totalLevels = 10;
const questionsPerLevel = 10;
const questions = [];
const basicOperators = ["+", "-"];
const allOperators = ["+", "-", "*"];

function computeAnswer(n1, op, n2) {
  switch (op) {
    case "+":
      return n1 + n2;
    case "-":
      return n1 - n2;
    case "*":
      return n1 * n2;
    case "/":
      return n2 !== 0 ? n1 / n2 : null;
    default:
      return null;
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
  arr.sort((a,b)=>a-b).forEach(l => {
    const li = document.createElement('li');
    li.textContent = `Bosqich ${l}`;
    list.appendChild(li);
  });
}

function generateQuestions(level) {
  questions.length = 0;
  for (let i = 0; i < questionsPerLevel; i++) {
    let num1, num2, operator;

    // Levels 1-3: digits, 2-digit, 3-digit respectively; only + and -
    if (level === 1) {
      num1 = Math.floor(Math.random() * 9) + 1; // 1..9
      num2 = Math.floor(Math.random() * 9) + 1;
      operator = basicOperators[Math.floor(Math.random() * basicOperators.length)];
    } else if (level === 2) {
      num1 = Math.floor(Math.random() * 90) + 10; // 10..99
      num2 = Math.floor(Math.random() * 90) + 10;
      operator = basicOperators[Math.floor(Math.random() * basicOperators.length)];
    } else if (level === 3) {
      num1 = Math.floor(Math.random() * 900) + 100; // 100..999
      num2 = Math.floor(Math.random() * 900) + 100;
      operator = basicOperators[Math.floor(Math.random() * basicOperators.length)];
    } else {
      // Level 4 and above: allow multiplication as well
      // Scale numbers with level to keep difficulty increasing
      const scale = Math.pow(10, Math.min(3, Math.floor((level - 4) / 2) + 1));
      num1 = Math.floor(Math.random() * (9 * scale)) + 1;
      num2 = Math.floor(Math.random() * (9 * scale)) + 1;
      operator = allOperators[Math.floor(Math.random() * allOperators.length)];
    }

    // Avoid negative results for subtraction
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
<<<<<<< HEAD
      statusSpan.innerHTML = "❌";
      statusSpan.style.color = "red";
=======
      userAnswers.push({
        question: q.question,
        userAnswer,
        correctAnswer: q.answer,
      });
      if (userAnswer === q.answer) {
        correctAnswers++;
      }
    }
  });

  const resultDiv = document.getElementById("result");
  const feedbackDiv = document.getElementById("feedback");
  feedbackDiv.innerHTML = "";
  feedbackDiv.classList.remove("hidden");

  if (!allAnswered) {
    // alert("Iltimos, hamma kataklarga javoblarni yozing!");
  

    
        modal.style.display = "block";
    

    span.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    return;
  }

  if (correctAnswers === questionsPerLevel) {
    currentLevel++;
    resultDiv.innerHTML =
      "<h1 class=\"correct\">Hammasi to'g'ri! Keyingi bosqichga o'tdingiz! 🎉🎉🎉 </h1>";
    if (currentLevel <= totalLevels) {
      generateQuestions(currentLevel);
      displayQuestions();
      document.getElementById("level").innerText = currentLevel;
    } else {
      resultDiv.innerHTML =
        "Tabriklaymiz! Siz barcha bosqichlarni muvaffaqiyatli o'tdingiz!";
>>>>>>> d06f821b2ab7a10305761135363c908f134f77db
    }
  } else {
    statusSpan.innerHTML = "";
  }
}

window.addEventListener("DOMContentLoaded", () => {
  const quizContainer = document.getElementById('quiz-container');
  if (!quizContainer) return; // Only initialize on quiz page

  const submitBtn = document.getElementById("submit");
  const resultDiv = document.getElementById("result");
  const timerEl = document.getElementById('timer');
  const showAnswersBtn = document.getElementById('show-answers');

  updateProgressList();
  generateQuestions(currentLevel);
  displayQuestions();
  const levelEl = document.getElementById("level");
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

<<<<<<< HEAD
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
=======


// Dastlabki misollarni generatsiya qilish
generateQuestions(currentLevel);
displayQuestions();
>>>>>>> d06f821b2ab7a10305761135363c908f134f77db
