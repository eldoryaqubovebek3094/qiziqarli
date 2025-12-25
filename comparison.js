let comparisonData = null;
let currentGrade = 1;
let currentQuestions = [];
let userAnswers = [];

// Load comparison data from JSON
async function loadComparisonData() {
  try {
    const response = await fetch('comparison.json');
    comparisonData = await response.json();
  } catch (error) {
    console.error('Failed to load comparison.json:', error);
    comparisonData = {};
  }
}

// Shuffle array
function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Load and display comparison questions
function loadComparison(grade) {
  currentGrade = grade;
  userAnswers = [];

  if (!comparisonData || !comparisonData[grade]) {
    alert('Savollar topilmadi');
    return;
  }

  // Copy and shuffle questions
  currentQuestions = shuffleArray([...comparisonData[grade]]).slice(0, 10);

  // Update grade display
  const gradeText = grade === 1 ? '1-sinf' : grade === 2 ? '2-sinf' : grade === 3 ? '3-sinf' : '4-sinf';
  document.getElementById('comparison-grade').textContent = gradeText;

  // Show comparison section
  document.getElementById('comparison-section').style.display = 'block';
  document.getElementById('comparison-result').classList.add('hidden');

  // Render questions
  renderComparisons();
}

// Render comparison pairs with choice buttons
function renderComparisons() {
  const container = document.getElementById('comparison-questions');
  container.innerHTML = '';

  currentQuestions.forEach((q, idx) => {
    const div = document.createElement('div');
    div.className = 'comparison-item';
    div.style.cssText = 'margin: 20px 0; padding: 15px; border: 1px solid var(--accent); border-radius: 8px;';

    div.innerHTML = `
      <div style="font-size: 24px; text-align: center; margin-bottom: 15px;">
        <span style="font-weight: bold; color: var(--primary);">${q.left}</span>
        <span style="margin: 0 30px;">?</span>
        <span style="font-weight: bold; color: var(--primary);">${q.right}</span>
      </div>
      <div style="display: flex; justify-content: center; gap: 10px;">
        <button class="btn-choice" onclick="selectAnswer(${idx}, '<')" data-idx="${idx}" data-choice="<" style="padding: 10px 20px; font-size: 18px; cursor: pointer;">
          &lt;
        </button>
        <button class="btn-choice" onclick="selectAnswer(${idx}, '=')" data-idx="${idx}" data-choice="=" style="padding: 10px 20px; font-size: 18px; cursor: pointer;">
          =
        </button>
        <button class="btn-choice" onclick="selectAnswer(${idx}, '>')" data-idx="${idx}" data-choice=">" style="padding: 10px 20px; font-size: 18px; cursor: pointer;">
          &gt;
        </button>
      </div>
    `;

    container.appendChild(div);
  });
}

// Track user choice
function selectAnswer(idx, choice) {
  // Store user answer
  userAnswers[idx] = choice;

  // Highlight selected button
  const buttons = document.querySelectorAll(`[data-idx="${idx}"]`);
  buttons.forEach(btn => btn.style.backgroundColor = '');
  const selected = document.querySelector(`[data-idx="${idx}"][data-choice="${choice}"]`);
  if (selected) {
    selected.style.backgroundColor = 'var(--accent)';
    selected.style.color = 'var(--bg)';
  }
}

// Submit and check answers
function submitComparison() {
  let correct = 0;
  const feedback = [];

  currentQuestions.forEach((q, idx) => {
    const userChoice = userAnswers[idx] || '?';
    const isCorrect = userChoice === q.correct;
    if (isCorrect) correct++;

    feedback.push(`
      <div style="padding: 10px; margin: 10px 0; border-radius: 5px; ${isCorrect ? 'background: rgba(0,255,0,0.2);' : 'background: rgba(255,0,0,0.2);'}">
        <strong>${q.left} ${userChoice} ${q.right}</strong> — 
        ${isCorrect ? '✓ To\'g\'ri!' : `✗ Xato. To\'g\'ri javob: ${q.left} ${q.correct} ${q.right}`}
      </div>
    `);
  });

  const percentage = Math.round((correct / currentQuestions.length) * 100);
  const resultDiv = document.getElementById('comparison-result');
  resultDiv.innerHTML = `
    <h3>Natija: ${correct}/${currentQuestions.length} to\'g\'ri (${percentage}%)</h3>
    <div>${feedback.join('')}</div>
  `;
  resultDiv.classList.remove('hidden');
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', loadComparisonData);
