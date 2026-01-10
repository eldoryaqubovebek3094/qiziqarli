(function(){
    /* ====== KO‘PAYTIRISH JADVALI (1–9) ====== */
    const table = document.getElementById('times-table');
    if (!table) return;

    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    headerRow.appendChild(document.createElement('th')); // bo‘sh qator ustuni

    for (let j = 1; j <= 9; j++) {
        const th = document.createElement('th');
        th.textContent = j;
        headerRow.appendChild(th);
    }
    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');

    for (let i = 1; i <= 9; i++) {
        const tr = document.createElement('tr');
        const rowHead = document.createElement('th');
        rowHead.textContent = i;
        tr.appendChild(rowHead);

        for (let j = 1; j <= 9; j++) {
            const td = document.createElement('td');
            td.textContent = i * j;
            td.addEventListener('click', () => {
                td.style.background = '#f9d423';
                setTimeout(()=>{ td.style.background=''; },300);
            });
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }
    table.appendChild(tbody);

    /* ====== KREATIV BLOK / SLAYDER ====== */
    const creativeBox = document.createElement('div');
    creativeBox.style.marginTop = "20px";
    creativeBox.style.padding = "15px";
    creativeBox.style.borderRadius = "12px";
    creativeBox.style.background = "linear-gradient(135deg,#74ebd5,#9face6)";
    creativeBox.style.color = "#fff";
    creativeBox.style.fontSize = "18px";
    creativeBox.style.textAlign = "center";
    creativeBox.style.transition = "opacity 0.5s";

    const messages = [
        "📘 Har kuni 10 daqiqa mashq — katta natija!",
        "🧠 Ko‘paytirish miyani kuchaytiradi",
        "🚀 Bugun 1 ta jadval — ertaga tez hisob!",
        "🎯 Xato qilishdan qo‘rqma, o‘rganish shundan boshlanadi",
        "⭐ Matematikani bilgan odam har joyda yutadi",
        "🔥 Sen buni qila olasan!"
    ];

    let index = 0;
    creativeBox.textContent = messages[index];
    table.parentElement.appendChild(creativeBox);

    setInterval(() => {
        creativeBox.style.opacity = "0";
        setTimeout(() => {
            index = (index + 1) % messages.length;
            creativeBox.textContent = messages[index];
            creativeBox.style.opacity = "1";
        },500);
    }, 5000);

    /* ====== MINI O‘YIN: gameBox va javob ko‘rsatish ====== */
    const gameBox = document.createElement('div');
    gameBox.id = 'game-box';
    gameBox.style.marginTop = '30px';
    gameBox.style.padding = '15px';
    gameBox.style.borderRadius = '12px';
    gameBox.style.background = 'linear-gradient(135deg,#f6d365,#fda085)';
    gameBox.style.color = '#000';
    gameBox.style.fontSize = '18px';
    gameBox.style.textAlign = 'center';

    table.parentElement.appendChild(gameBox);

    const questionDiv = document.createElement('div');
    questionDiv.id = 'question';
    questionDiv.style.marginBottom = '10px';

    const answersDiv = document.createElement('div');
    answersDiv.id = 'answers';
    answersDiv.style.margin = '10px 0';

    const scoreDiv = document.createElement('div');
    scoreDiv.id = 'score';
    scoreDiv.style.fontWeight = 'bold';
    scoreDiv.style.marginTop = '5px';
    scoreDiv.textContent = 'Ball: 0';

    const feedbackDiv = document.createElement('div');
    feedbackDiv.id = 'feedback';
    feedbackDiv.style.marginTop = '10px';
    feedbackDiv.style.fontWeight = 'bold';
    feedbackDiv.style.fontSize = '16px';

    gameBox.appendChild(questionDiv);
    gameBox.appendChild(answersDiv);
    gameBox.appendChild(scoreDiv);
    gameBox.appendChild(feedbackDiv);

    let score = 0;

    function generateQuestion(){
        const a = Math.floor(Math.random()*9)+1;
        const b = Math.floor(Math.random()*9)+1;
        const correct = a*b;
        questionDiv.textContent = `Nechiga teng ${a} × ${b} ?`;

        answersDiv.innerHTML = '';
        feedbackDiv.textContent = '';

        let options = [correct];
        while(options.length < 4){
            let opt = Math.floor(Math.random()*81)+1;
            if(!options.includes(opt)) options.push(opt);
        }
        options = options.sort(()=>Math.random()-0.5);

        options.forEach(opt=>{
            const btn = document.createElement('button');
            btn.textContent = opt;
            btn.style.margin = '5px';
            btn.style.padding = '8px 12px';
            btn.style.borderRadius = '6px';
            btn.style.border = 'none';
            btn.style.cursor = 'pointer';

            btn.addEventListener('click', ()=>{
                if(opt === correct){
                    score++;
                    feedbackDiv.style.color = 'green';
                    feedbackDiv.textContent = `To‘g‘ri ✅ Javob: ${correct}`;
                } else {
                    feedbackDiv.style.color = 'red';
                    feedbackDiv.textContent = `Noto‘g‘ri ❌ Javob: ${correct}`;
                }
                scoreDiv.textContent = `Ball: ${score}`;
                setTimeout(generateQuestion, 1000); // 1 soniyadan keyin keyingi savol
            });

            answersDiv.appendChild(btn);
        });
    }

    generateQuestion();

})();
