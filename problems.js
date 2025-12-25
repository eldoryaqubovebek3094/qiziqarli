// Load word problems from JSON
let problemsData = null;
let shuffledProblems = [];

async function loadProblemsData() {
  try {
    const response = await fetch('problems.json');
    problemsData = await response.json();
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

let currentGrade = 1;
let currentAnswers = [];

function loadProblems(grade) {
  if (!problemsData) {
    console.error('Masalalar yuklanmadi');
    return;
  }

  currentGrade = grade;
  currentAnswers = [];
  const section = document.getElementById('problems-section');
  const questionsDiv = document.getElementById('problems-questions');
  const resultDiv = document.getElementById('problems-result');
  
  document.getElementById('problems-grade').textContent = grade + '-sinf';
  questionsDiv.innerHTML = '';
  resultDiv.classList.add('hidden');

  const probs = problemsData[grade] || [];
  shuffledProblems = shuffleArray(probs);
  shuffledProblems.forEach((p, idx) => {
    const problemDiv = document.createElement('div');
    problemDiv.className = 'question';
    problemDiv.innerHTML = `
      <p><strong>${idx + 1}.</strong> ${p.problem}</p>
      <input type="number" placeholder="Javobni kiriting" onchange="currentAnswers[${idx}] = this.value" style="width: 120px; padding: 8px; font-size: 1em; border: 2px solid var(--primary); border-radius: 5px;">
    `;
    questionsDiv.appendChild(problemDiv);
  });

  section.style.display = 'block';
  window.scrollTo(0, 0);
}

function submitProblems() {
  const probs = shuffledProblems;
  let correct = 0;
  const resultDiv = document.getElementById('problems-result');
  
  let html = '<h3>Masalalar Natijalari</h3>';
  
  probs.forEach((p, idx) => {
    const userAnswer = parseInt(currentAnswers[idx]);
    const isCorrect = userAnswer === p.answer;
    if (isCorrect) correct++;
    
    html += `
      <div style="margin: 10px 0; padding: 10px; background: ${isCorrect ? '#d4edda' : '#f8d7da'}; border-radius: 5px;">
        <p><strong>${idx + 1}.</strong> ${p.problem}</p>
        <p>Sizning javobingiz: <span style="color: ${isCorrect ? 'green' : 'red'}">${currentAnswers[idx] !== undefined && currentAnswers[idx] !== '' ? currentAnswers[idx] : 'Javob yo\'q'}</span></p>
        ${!isCorrect ? `<p>To'g'ri javob: <span style="color: green">${p.answer}</span></p>` : ''}
      </div>
    `;
  });

  const percentage = Math.round((correct / probs.length) * 100);
  html += `
    <div style="margin-top: 20px; padding: 15px; background: #e7f3fe; border-radius: 5px; font-size: 1.2em;">
      <p><strong>Jami: ${correct} / ${probs.length} (${percentage}%)</strong></p>
      ${percentage >= 70 ? '<p style="color: green;">Ajoyib! 🎉</p>' : '<p style="color: #ff6b6b;">Yana harakat qiling! 💪</p>'}
    </div>
  `;

  resultDiv.innerHTML = html;
  resultDiv.classList.remove('hidden');
  window.scrollTo(0, document.body.scrollHeight);
}

// Load data on page load
document.addEventListener('DOMContentLoaded', loadProblemsData);
