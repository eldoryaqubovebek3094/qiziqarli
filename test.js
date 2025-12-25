// Load test questions from JSON and shuffle them
let testData = null;
let shuffledQuestions = [];

let currentGrade = 1;
let currentAnswers = [];

// Load JSON data
async function loadTestData() {
  try {
    const response = await fetch('test.json');
    testData = await response.json();
  } catch (error) {
    console.error('JSON faylni yuklashda xato:', error);
  }
}

function shuffleArray(arr) {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function loadTest(grade) {
  if (!testData) {
    console.error('Test ma\'lumotlari yuklanmadi');
    return;
  }

  currentGrade = grade;
  currentAnswers = [];
  const section = document.getElementById('test-section');
  const questionsDiv = document.getElementById('test-questions');
  const resultDiv = document.getElementById('test-result');
  
  document.getElementById('test-grade').textContent = grade + '-sinf';
  questionsDiv.innerHTML = '';
  resultDiv.classList.add('hidden');

  const questions = testData[grade] || [];
  shuffledQuestions = shuffleArray(questions);
  
  shuffledQuestions.forEach((q, idx) => {
    const questionDiv = document.createElement('div');
    questionDiv.className = 'question';
    questionDiv.innerHTML = `
      <p><strong>${idx + 1}.</strong> ${q.question}</p>
      <div>
        ${q.options.map((opt, optIdx) => `
          <label style="display: inline-block; margin-right: 15px;">
            <input type="radio" name="q${idx}" value="${optIdx}" onchange="currentAnswers[${idx}] = ${optIdx}">
            ${opt}
          </label>
        `).join('')}
      </div>
    `;
    questionsDiv.appendChild(questionDiv);
  });

  section.style.display = 'block';
  window.scrollTo(0, 0);
}

function submitTest() {
  const questions = shuffledQuestions;
  let correct = 0;
  const resultDiv = document.getElementById('test-result');
  
  let html = '<h3>Test Natijalari</h3>';
  
  questions.forEach((q, idx) => {
    const userAnswer = currentAnswers[idx];
    const isCorrect = userAnswer === q.correct;
    if (isCorrect) correct++;
    
    html += `
      <div style="margin: 10px 0; padding: 10px; background: ${isCorrect ? '#d4edda' : '#f8d7da'}; border-radius: 5px;">
        <p><strong>${idx + 1}.</strong> ${q.question}</p>
        <p>Sizning javobingiz: <span style="color: ${isCorrect ? 'green' : 'red'}">${userAnswer !== undefined ? q.options[userAnswer] : 'Javob yo\'q'}</span></p>
        ${!isCorrect ? `<p>To'g'ri javob: <span style="color: green">${q.options[q.correct]}</span></p>` : ''}
      </div>
    `;
  });

  const percentage = Math.round((correct / questions.length) * 100);
  html += `
    <div style="margin-top: 20px; padding: 15px; background: #e7f3fe; border-radius: 5px; font-size: 1.2em;">
      <p><strong>Jami: ${correct} / ${questions.length} (${percentage}%)</strong></p>
      ${percentage >= 70 ? '<p style="color: green;">Ajoyib! 🎉</p>' : '<p style="color: #ff6b6b;">Yana harakat qiling! 💪</p>'}
    </div>
  `;

  resultDiv.innerHTML = html;
  resultDiv.classList.remove('hidden');
  window.scrollTo(0, document.body.scrollHeight);
}

// Load data on page load
document.addEventListener('DOMContentLoaded', loadTestData);
