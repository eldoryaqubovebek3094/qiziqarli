// Load game questions from JSON
let gamesData = null;

async function loadGamesData() {
  try {
    const response = await fetch('games.json');
    gamesData = await response.json();
  } catch (error) {
    console.error('JSON faylni yuklashda xato:', error);
  }
}

let currentGameGrade = 1;
let gameScore = 0;
let gameTimer = 30;
let timerInterval = null;
let questionIndex = 0;
let askedQuestions = [];

function startSpeedChallenge(grade) {
  currentGameGrade = grade;
  gameScore = 0;
  gameTimer = 30;
  questionIndex = 0;
  askedQuestions = [];

  const section = document.getElementById('game-section');
  const result = document.getElementById('game-result');
  result.classList.add('hidden');
  section.style.display = 'block';

  document.getElementById('game-score').textContent = gameScore;
  document.getElementById('game-answer').value = '';
  document.getElementById('game-answer').focus();

  nextGameQuestion();

  if (timerInterval) clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    gameTimer--;
    document.getElementById('game-timer').textContent = gameTimer;

    if (gameTimer <= 0) {
      clearInterval(timerInterval);
      endGame();
    }
  }, 1000);

  window.scrollTo(0, 0);
}

function nextGameQuestion() {
  if (!gamesData) return;
  const questions = gamesData[currentGameGrade];
  if (questionIndex >= 10) {
    endGame();
    return;
  }

  const q = questions[Math.floor(Math.random() * questions.length)];
  askedQuestions.push(q);
  document.getElementById('game-question').textContent = q.q + " = ?";
  document.getElementById('game-answer').value = '';
  document.getElementById('game-answer').focus();
  questionIndex++;
}

function submitGameAnswer() {
  const answer = parseInt(document.getElementById('game-answer').value);
  if (isNaN(answer)) return;

  const currentQuestion = askedQuestions[askedQuestions.length - 1];
  if (answer === currentQuestion.a) {
    gameScore += 10;
    document.getElementById('game-score').textContent = gameScore;
  }

  if (questionIndex < 10) {
    nextGameQuestion();
  } else {
    endGame();
  }
}

function endGame() {
  clearInterval(timerInterval);
  const section = document.getElementById('game-section');
  const result = document.getElementById('game-result');

  let message = '';
  if (gameScore >= 80) {
    message = '🌟 Ajoyib natija! Siz matematik ustasi!';
  } else if (gameScore >= 60) {
    message = '👍 Yaxshi! Ozroq mashq qiling.';
  } else {
    message = '💪 Yana harakat qiling!';
  }

  result.innerHTML = `
    <h3>O'yin Tugadi!</h3>
    <p><strong>Puan: ${gameScore} / 100</strong></p>
    <p>${message}</p>
    <button onclick="startSpeedChallenge(${currentGameGrade})" class="button">Qayta O'yna</button>
  `;
  result.classList.remove('hidden');
}

// Allow Enter key to submit
document.addEventListener('DOMContentLoaded', () => {
  loadGamesData();
  const input = document.getElementById('game-answer');
  if (input) {
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') submitGameAnswer();
    });
  }
});
