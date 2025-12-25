(function() {
  // Prevent some default keys (lightweight protection)
  document.addEventListener("contextmenu", function (event) {
    event.preventDefault();
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "F12") {
      event.preventDefault();
    }
  });

  // Scoped variables to avoid conflicts with other scripts
  let currentLevelLocal = 1;
  const totalLevelsLocal = 10;
  const questionsPerLevelLocal = 10;
  const questionsLocal = [];
  const basicOperatorsLocal = ["+", "-"];
  const allOperatorsLocal = ["+", "-", "*", "/"];

  function computeAnswerLocal(n1, op, n2) {
    switch (op) {
      case "+": return n1 + n2;
      case "-": return n1 - n2;
      case "*": return n1 * n2;
      case "/": return n2 !== 0 ? n1 / n2 : null;
      default: return null;
    }
  }

  function generateQuestionsLocal(level) {
    questionsLocal.length = 0;
    for (let i = 0; i < questionsPerLevelLocal; i++) {
      let num1, num2, operator;
      if (level < 4) {
        num1 = Math.floor(Math.random() * (Math.pow(10, level) + 1));
        num2 = Math.floor(Math.random() * (Math.pow(10, level) + 1));
        operator = basicOperatorsLocal[Math.floor(Math.random() * basicOperatorsLocal.length)];
        if (operator === "-" && num1 < num2) [num1, num2] = [num2, num1];
      } else {
        const base = Math.pow(10, Math.floor((level - 4) / 2));
        num1 = Math.floor(Math.random() * (base + 1));
        num2 = Math.floor(Math.random() * (base + 1));
        operator = allOperatorsLocal[Math.floor(Math.random() * allOperatorsLocal.length)];
        if (operator === "-" && num1 < num2) [num1, num2] = [num2, num1];
        if (operator === "/" && num1 < num2) [num1, num2] = [num2, num1];
      }
      if (operator === "/" && num2 === 0) num2 = 1;
      questionsLocal.push({ question: `${num1} ${operator} ${num2} = ?`, answer: computeAnswerLocal(num1, operator, num2) });
    }
  }

  function displayQuestionsLocal() {
    const questionsContainer = document.getElementById("questions");
    if (!questionsContainer) return;
    questionsContainer.innerHTML = "";
    questionsLocal.forEach((q, index) => {
      questionsContainer.innerHTML += `
        <div class="question">
          <span>${index + 1}) ${q.question}</span>
          <input type="number" id="answer_local_${index}" />
        </div>`;
    });
  }

  // Only initialize if quiz section exists on the page
  if (document.getElementById('quiz-container')) {
    generateQuestionsLocal(currentLevelLocal);
    displayQuestionsLocal();

    const submitBtnLocal = document.getElementById('submit');
    if (submitBtnLocal) {
      submitBtnLocal.addEventListener('click', () => {
        let allAnswered = true;
        let correctAnswers = 0;
        const userAnswers = [];
        questionsLocal.forEach((q, index) => {
          const val = parseFloat(document.getElementById(`answer_local_${index}`)?.value);
          if (isNaN(val)) {
            allAnswered = false;
          } else {
            userAnswers.push({ question: q.question, userAnswer: val, correctAnswer: q.answer });
            if (Math.abs(val - q.answer) < 1e-9) correctAnswers++;
          }
        });
        const resultDiv = document.getElementById('result');
        const feedbackDiv = document.getElementById('feedback');
        if (feedbackDiv) { feedbackDiv.innerHTML = ''; feedbackDiv.classList.remove('hidden'); }
        if (!allAnswered) { alert('Iltimos, hamma kataklarga javoblarni yozing!'); return; }
        if (correctAnswers === questionsPerLevelLocal) {
          currentLevelLocal++;
          if (resultDiv) resultDiv.innerHTML = '<h1 class="correct">Hammasi to\'g\'ri! Keyingi bosqichga \u0275tdingiz! 🎉</h1>';
          if (currentLevelLocal <= totalLevelsLocal) {
            generateQuestionsLocal(currentLevelLocal);
            displayQuestionsLocal();
            const levelEl = document.getElementById('level'); if (levelEl) levelEl.innerText = currentLevelLocal;
          } else {
            if (resultDiv) resultDiv.innerHTML = 'Tabriklaymiz! Siz barcha bosqichlarni muvaffaqiyatli o\'tdingiz!';
          }
        } else {
          if (resultDiv) resultDiv.innerHTML = '<h1 class="incorrect"> Noto\'g\'ri! Qaytadan urinib ko\'ring. 😔 </h1>';
        }

        if (feedbackDiv) {
          userAnswers.forEach((item, index) => {
            feedbackDiv.innerHTML += `<div class="feedback"><div class="question-number">${index + 1}) Savol: ${item.question} <br/>Sizning javobingiz: ${item.userAnswer} <br/>To'g'ri javob: ${item.correctAnswer} <br/>${Math.abs(item.userAnswer - item.correctAnswer) < 1e-9 ? '<h1 class="correct">To\'g\'ri!</h1>' : '<h1 class="incorrect">Noto\'g\'ri!</h1>'}</div></div>`;
          });
        }
      });
    }
  }
})();

