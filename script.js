

// document.addEventListener('contextmenu', function(event) {
//     event.preventDefault();
// });

// document.addEventListener('keydown', function(event) {
//     if (event.key === 'F12' || event.key === 'Escape') {
//         event.preventDefault();
//     }
// });

// let currentLevel = 1;
// const totalLevels = 10;
// const questionsPerLevel = 10;
// const questions = [];
// const operators = ['+', '-']; // 1-3 bosqichlarda faqat qo'shish va ayirish
// const advancedOperators = ['+', '-', '*', '/']; // 4-bosqichdan boshlab barcha operatsiyalar

// function generateQuestions(level) {
//     questions.length = 0; // Oldingi savollarni tozalash
//     for (let i = 0; i < questionsPerLevel; i++) {
//         let num1, num2, operator;

//         if (level < 4) {
//             // 1-3 bosqichlar uchun faqat qo'shish va ayirish
//             num1 = Math.floor(Math.random() * (Math.pow(10, level) + 1));
//             num2 = Math.floor(Math.random() * (Math.pow(10, level) + 1));
//             operator = operators[Math.floor(Math.random() * operators.length)];
//         } else {
//             // 4-bosqichdan boshlab barcha operatsiyalar
//             num1 = Math.floor(Math.random() * (Math.pow(10, level) + 1));
//             num2 = Math.floor(Math.random() * (Math.pow(10, level) + 1));
//             operator = advancedOperators[Math.floor(Math.random() * advancedOperators.length)];
//         }

//         // Bo'linish uchun num2 nol bo'lmasligini ta'minlash
//         if (operator === '/' && num2 === 0) {
//             num2 = 1; // Agar num2 nol bo'lsa, 1 ga o'zgartiramiz
//         }

//         let question = `${num1} ${operator} ${num2} = ?`;
//         questions.push({ question, answer: eval(`${num1} ${operator} ${num2}`) });
//     }
// }

// function displayQuestions() {
//     const questionsContainer = document.getElementById('questions');
//     questionsContainer.innerHTML = '';
//     questions.forEach((q, index) => {
//         questionsContainer.innerHTML += `
//             <div class="question">
//                 <span>${index + 1}) ${q.question}</span>
//                 <input type="number" id="answer${index}" />
//             </div>
//         `;
//     });
// }

// document.getElementById('submit').addEventListener('click', () => {
//     let allAnswered = true;
//     let correctAnswers = 0;
//     const userAnswers = [];

//     questions.forEach((q, index) => {
//         const userAnswer = parseFloat(document.getElementById(`answer${index}`).value);
//         if (isNaN(userAnswer)) {
//             allAnswered = false; // Agar hamma javoblar berilmagan bo'lsa
//         } else {
//             userAnswers.push({ question: q.question, userAnswer, correctAnswer: q.answer });
//             if (userAnswer === q.answer) {
//                 correctAnswers++;
//             }
//         }
//     });

//     const resultDiv = document.getElementById('result');
//     const feedbackDiv = document.getElementById('feedback');
//     feedbackDiv.innerHTML = '';
//     feedbackDiv.classList.remove('hidden');

//     if (!allAnswered) {
//         alert("Iltimos, hamma kataklarga javoblarni yozing!");
//         return;
//     }

//     if (correctAnswers === questionsPerLevel) {
//         currentLevel++;
//         resultDiv.innerHTML = '<h1 class="correct">To\'g\'ri! Keyingi bosqichga o\'tdingiz! 🎉🎉🎉 </h1>';
//         if (currentLevel <= totalLevels) {
//             generateQuestions(currentLevel);
//             displayQuestions();
//             document.getElementById('level').innerText = currentLevel;
//         } else {
//             resultDiv.innerHTML = 'Tabriklaymiz! Siz barcha bosqichlarni muvaffaqiyatli o\'tdingiz!';
//         }
//     } else {
//         resultDiv.innerHTML = '<h1 class="incorrect"> Noto\'g\'ri! Qaytadan urunib ko\'ring. 😔😔😔 </h1>';
//     }

//     // Foydalanuvchining javoblari va to'g'ri javoblarni ko'rsatish
//     userAnswers.forEach((item, index) => {
//         feedbackDiv.innerHTML += `
//             <div class="feedback">
//                 <div class="question-number">${index + 1}) 
//                 Savol: ${item.question} <br />
//                 Sizning javobingiz: ${item.userAnswer} <br />
//                 To'g'ri javob: ${item.correctAnswer} <br />
//                 ${item.userAnswer === item.correctAnswer ? '<h1 class="correct">To\'g\'ri!</h1>' : '<h1 class="incorrect">Noto\'g\'ri! </h1>'}</div>
//             </div>
//         `;
//     });
// });

// // Dastlabki misollarni generatsiya qilish
// generateQuestions(currentLevel);
// displayQuestions();



document.addEventListener('contextmenu', function(event) {
    event.preventDefault();
});

document.addEventListener('keydown', function(event) {
    if (event.key === 'F12' || event.key === 'Escape') {
        event.preventDefault();
    }
});

let currentLevel = 1;
const totalLevels = 10;
const questionsPerLevel = 10;
const questions = [];
const basicOperators = ['+', '-']; // 1-3 bosqichlarda faqat qo'shish va ayirish
const allOperators = ['+', '-', '*', '/']; // 4-bosqichdan boshlab barcha operatsiyalar

function generateQuestions(level) {
    questions.length = 0; // Oldingi savollarni tozalash
    for (let i = 0; i < questionsPerLevel; i++) {
        let num1, num2, operator;

        // 1-3 bosqichlar uchun
        if (level < 4) {
            num1 = Math.floor(Math.random() * (Math.pow(10, level) + 1));
            num2 = Math.floor(Math.random() * (Math.pow(10, level) + 1));
            operator = basicOperators[Math.floor(Math.random() * basicOperators.length)];
        } else {
            // 4-dan boshlab 1-lik, 10-lik, 100-lik, 1000-lik sonlar bilan savollar
            const base = Math.pow(10, Math.floor((level - 4) / 2)); // 1, 10, 100, 1000
            num1 = Math.floor(Math.random() * (base + 1));
            num2 = Math.floor(Math.random() * (base + 1));
            operator = allOperators[Math.floor(Math.random() * allOperators.length)];
        }

        // Bo'linish uchun num2 nol bo'lmasligini ta'minlash
        if (operator === '/' && num2 === 0) {
            num2 = 1; // Agar num2 nol bo'lsa, 1 ga o'zgartiramiz
        }

        let question = `${num1} ${operator} ${num2} = ?`;
        questions.push({ question, answer: eval(`${num1} ${operator} ${num2}`) });
    }
}

function displayQuestions() {
    const questionsContainer = document.getElementById('questions');
    questionsContainer.innerHTML = '';
    questions.forEach((q, index) => {
        questionsContainer.innerHTML += `
            <div class="question">
                <span>${index + 1}) ${q.question}</span>
                <input type="number" id="answer${index}" />
            </div>
        `;
    });
}

document.getElementById('submit').addEventListener('click', () => {
    let allAnswered = true;
    let correctAnswers = 0;
    const userAnswers = [];

    questions.forEach((q, index) => {
        const userAnswer = parseFloat(document.getElementById(`answer${index}`).value);
        if (isNaN(userAnswer)) {
            allAnswered = false; // Agar hamma javoblar berilmagan bo'lsa
        } else {
            userAnswers.push({ question: q.question, userAnswer, correctAnswer: q.answer });
            if (userAnswer === q.answer) {
                correctAnswers++;
            }
        }
    });

    const resultDiv = document.getElementById('result');
    const feedbackDiv = document.getElementById('feedback');
    feedbackDiv.innerHTML = '';
    feedbackDiv.classList.remove('hidden');

    if (!allAnswered) {
        alert("Iltimos, hamma kataklarga javoblarni yozing!");
        return;
    }

    if (correctAnswers === questionsPerLevel) {
        currentLevel++;
        resultDiv.innerHTML = '<h1 class="correct">Hammasi to\'g\'ri! Keyingi bosqichga o\'tdingiz! 🎉🎉🎉 </h1>';
        if (currentLevel <= totalLevels) {
            generateQuestions(currentLevel);
            displayQuestions();
            document.getElementById('level').innerText = currentLevel;
        } else {
            resultDiv.innerHTML = 'Tabriklaymiz! Siz barcha bosqichlarni muvaffaqiyatli o\'tdingiz!';
        }
    } else {
        resultDiv.innerHTML = '<h1 class="incorrect"> Noto\'g\'ri! Qaytadan urunib ko\'ring. 😔😔😔 </h1>';
    }

    // Foydalanuvchining javoblari va to'g'ri javoblarni ko'rsatish
    userAnswers.forEach((item, index) => {
        feedbackDiv.innerHTML += `
            <div class="feedback">
                <div class="question-number">${index + 1}) 
                Savol: ${item.question} <br />
                Sizning javobingiz: ${item.userAnswer} <br />
                To'g'ri javob: ${item.correctAnswer} <br />
                ${item.userAnswer === item.correctAnswer ? '<h1 class="correct">To\'g\'ri!</h1>' : '<h1 class="incorrect">Noto\'g\'ri! </h1>'}</div>
            </div>
        `;
    });
});

// Dastlabki misollarni generatsiya qilish
generateQuestions(currentLevel);
displayQuestions();