// JSON fayldan jumlalar
        const sentences = [
            { "word": "BOLAJON" },
            { "word": "OLMA" },
            { "word": "QALAMPIR" },
            { "word": "DARAJA" },
            { "word": "KITOB" },
            { "word": "MAKTAB" },
            { "word": "DO'STLIK" },
            { "word": "O'YIN" },
            { "word": "TABASSUM" },
            { "word": "ILM" },
            { "word": "TA'LIM" },
            { "word": "O'QITUVCHI" },
            { "word": "O'QITISH" },
            { "word": "FAN" },
            { "word": "JAVOB" },
            { "word": "SAVOL" },
            { "word": "YORIQNOMA" },
            { "word": "BILIM" },
            { "word": "MATEMATIKA" },
            { "word": "GEOGRAFIYA" },
            { "word": "TARIX" },
            { "word": "FIZIKA" },
            { "word": "KIMYO" },
            { "word": "BIOLOGIYA" },
            { "word": "INFORMATIKA" },
            { "word": "DUNYO" },
            { "word": "KOSMOS" },
            { "word": "YER" },
            { "word": "OY" },
            { "word": "TABIAT" },
            { "word": "HAYVONOT" },
            { "word": "O'SIMLIK" },
            { "word": "O'ZBEKISTON" },


        ];

        let current = null;

        // Funksiya: raqamlarni tayinlash va chalkashtirish
        function prepareWord() {
            current = sentences[Math.floor(Math.random() * sentences.length)].word;
            let letters = current.split('');
            let numbers = [];
            for (let i = 0; i < letters.length; i++) numbers.push(i + 1);
            numbers = numbers.sort(() => Math.random() - 0.5); // Chalkashtirish

            const gameDiv = document.getElementById('game');
            gameDiv.innerHTML = '';
            letters.forEach((ltr, idx) => {
                const div = document.createElement('div');
                div.className = 'letter-box';
                div.textContent = ltr;
                div.dataset.number = numbers[idx];

                // Kichkina raqam span orqali ko‘rsatish
                const numSpan = document.createElement('span');
                numSpan.textContent = numbers[idx];
                div.appendChild(numSpan);

                gameDiv.appendChild(div);
            });

            document.getElementById('userInput').value = '';
            document.getElementById('resultHarf').textContent = '';
        }

        // Tekshirish

        // Tekshirish
document.getElementById('checkBtn').addEventListener('click', () => {
    const input = document.getElementById('userInput').value;
    const gameDiv = document.getElementById('game');
    const result = document.getElementById('resultHarf');

    let correctSeq = Array.from(gameDiv.children)
        .map(div => div.dataset.number)
        .join('');

    result.className = ""; // eski ranglarni tozalash

    if (input === correctSeq) {
        result.textContent = "🎉 A’lo! Zo‘r bajarding! Davom etamiz! 🚀";
        result.classList.add("success");
        launchConfetti();

        setTimeout(() => {
            clearConfetti();
            prepareWord(); // keyingi so‘z
        }, 1800);

    } else {
        result.textContent = "🙂 Xato bo‘ldi, lekin taslim bo‘lma! Qayta urinib ko‘r 💪";
        result.classList.add("error");
    }
});



//    salyutlar


        function launchConfetti(){
    const confettiBox = document.getElementById('confetti');
    confettiBox.innerHTML = "";

    for(let i=0;i<60;i++){
        const conf = document.createElement('div');
        conf.className = "confetti";
        conf.style.left = Math.random()*100 + "vw";
        conf.style.backgroundColor =
            `hsl(${Math.random()*360},100%,50%)`;
        conf.style.animationDuration = 
            (Math.random()*1.5 + 1) + "s";
        confettiBox.appendChild(conf);
    }
}

function clearConfetti(){
    document.getElementById('confetti').innerHTML = "";
}


        // O‘yin boshlash
        prepareWord();


        