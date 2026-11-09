// --- PEMbolehubah UTAMA PERMAINAN ---
let players = [];
let currentPlayerIndex = 0;
let gameStarted = false;
let boardSize = 100;
let diceVal = 1;
let timer;
let timeLeft = 30;
let currentActiveQuestion = null;

// Senarai warna token pemain
const playerColors = ['#2563EB', '#10B981', '#F59E0B', '#EF4444'];

// Bank Soalan Tingkatan 4 (Matematik, Fizik, Kimia, Sains Komputer, AddMath)
const questionBank = [
    {
        subject: "Matematik",
        badgeColor: "#2563EB",
        question: "Apakah hasil bagi pengembangan ungkapan berikut: (x + 3)(x - 5)?",
        options: ["x² - 2x - 15", "x² + 2x - 15", "x² - 8x + 15", "x² + 8x + 15"],
        answer: 0
    },
    {
        subject: "Fizik",
        badgeColor: "#7C3AED",
        question: "Apakah unit bagi Pecutan dalam Sistem Unit Antarabangsa (SI)?",
        options: ["m/s", "m/s²", "N/kg", "kg m/s"],
        answer: 1
    },
    {
        subject: "Kimia",
        badgeColor: "#10B981",
        question: "Apakah zarah subatom yang mempunyai cas negatif?",
        options: ["Proton", "Neutron", "Elektron", "Nukleus"],
        answer: 2
    },
    {
        subject: "Sains Komputer",
        badgeColor: "#F59E0B",
        question: "Apakah struktur kawalan yang digunakan untuk mengulangi satu blok arahan selagi syarat tertentu dipenuhi?",
        options: ["If-Else", "While Loop", "Switch-Case", "Array"],
        answer: 1
    },
    {
        subject: "AddMath",
        badgeColor: "#EF4444",
        question: "Diberi fungsi f(x) = 2x + 3, cari nilai bagi f(4).",
        options: ["8", "10", "11", "14"],
        answer: 2
    },
    {
        subject: "Matematik",
        badgeColor: "#2563EB",
        question: "Berapakah jumlah sudut pedalaman bagi sebuah poligon sekata bersisi 5 (Pentagon)?",
        options: ["360°", "540°", "720°", "1080°"],
        answer: 1
    },
    {
        subject: "Fizik",
        badgeColor: "#7C3AED",
        question: "Hukum Gerakan Newton yang manakah menyatakan 'Setiap tindakan mempunyai tindak balas yang setara tetapi bertentangan arah'?",
        options: ["Hukum Gerakan Newton Pertama", "Hukum Gerakan Newton Kedua", "Hukum Gerakan Newton Ketiga", "Hukum Gravitasi Semesta"],
        answer: 2
    },
    {
        subject: "Kimia",
        badgeColor: "#10B981",
        question: "Unsur dalam Jadual Berkala yang terletak dalam Kumpulan 1 dikenali sebagai:",
        options: ["Gas Nul", "Logam Alkali", "Halogen", "Logam Peralihan"],
        answer: 1
    },
    {
        subject: "Sains Komputer",
        badgeColor: "#F59E0B",
        question: "Apakah jenis ralat yang berlaku apabila kod melanggar aturan sintaks bahasa pengaturcaraan?",
        options: ["Logic Error", "Runtime Error", "Syntax Error", "System Error"],
        answer: 2
    },
    {
        subject: "AddMath",
        badgeColor: "#EF4444",
        question: "Apakah kecerunan bagi garis lurus yang diwakili oleh persamaan 3x + 2y = 6?",
        options: ["-3/2", "3/2", "-2/3", "2/3"],
        answer: 0
    }
];

// Peta Tangga dan Ular (Petak Mula -> Petak Akhir)
const laddersAndSnakes = {
    4: 14,   // Tangga naik
    9: 31,   // Tangga naik
    20: 38,  // Tangga naik
    28: 84,  // Tangga naik
    40: 59,  // Tangga naik
    51: 67,  // Tangga naik
    63: 81,  // Tangga naik
    17: 7,   // Ular turun
    54: 34,  // Ular turun
    62: 19,  // Ular turun
    64: 60,  // Ular turun
    87: 24,  // Ular turun
    93: 73,  // Ular turun
    99: 78   // Ular turun
};

// --- FUNGSI PERSEDIAAN PERMAINAN ---
function startGame() {
    const p1 = document.getElementById('player1').value.trim();
    const p2 = document.getElementById('player2').value.trim();
    const p3 = document.getElementById('player3').value.trim();
    const p4 = document.getElementById('player4').value.trim();

    players = [];
    if (p1) players.push({ name: p1, pos: 1, color: playerColors[0], skipNext: false });
    if (p2) players.push({ name: p2, pos: 1, color: playerColors[1], skipNext: false });
    if (p3) players.push({ name: p3, pos: 1, color: playerColors[2], skipNext: false });
    if (p4) players.push({ name: p4, pos: 1, color: playerColors[3], skipNext: false });

    if (players.length < 2) {
        alert("Sila masukkan sekurang-kurangnya 2 nama pemain untuk TeamGame!");
        return;
    }

    // Tukar paparan skrin
    document.getElementById('setup-screen').classList.add('hidden');
    document.getElementById('game-main-content').classList.remove('hidden');

    gameStarted = true;
    currentPlayerIndex = 0;

    generateBoard();
    updateScoreboard();
    updateTurnInfo();
}

// --- JANA PAPAN DAM (10x10) ---
function generateBoard() {
    const boardEl = document.getElementById('board');
    boardEl.innerHTML = '';

    let gridArray = [];
    for (let r = 9; r >= 0; r--) {
        let rowCells = [];
        for (let c = 0; c < 10; c++) {
            let cellNum;
            if (r % 2 === 1) {
                cellNum = r * 10 + (10 - c);
            } else {
                cellNum = r * 10 + (c + 1);
            }
            rowCells.push(cellNum);
        }
        gridArray.push(rowCells);
    }

    for (let r = 0; r < 10; r++) {
        for (let c = 0; c < 10; c++) {
            let cellNum = gridArray[r][c];
            let cellDiv = document.createElement('div');
            cellDiv.classList.add('cell');
            cellDiv.id = `cell-${cellNum}`;
            cellDiv.innerHTML = `<span class="cell-number">${cellNum}</span>`;

            if (laddersAndSnakes[cellNum]) {
                if (laddersAndSnakes[cellNum] > cellNum) {
                    cellDiv.classList.add('ladder-cell');
                } else {
                    cellDiv.classList.add('snake-cell');
                }
            }

            boardEl.appendChild(cellDiv);
        }
    }
    updatePlayerTokens();
}

// --- KEMASKINI PAPARAN TOKEN PEMAIN PADA PAPAN ---
function updatePlayerTokens() {
    document.querySelectorAll('.player-token').forEach(el => el.remove());

    players.forEach((player, index) => {
        let cell = document.getElementById(`cell-${player.pos}`);
        if (cell) {
            let token = document.createElement('div');
            token.classList.add('player-token');
            token.style.backgroundColor = player.color;
            token.title = player.name;
            token.innerText = player.name.charAt(0).toUpperCase();
            cell.appendChild(token);
        }
    });
}

// --- KEMASKINI STATUS SKORBOARD ---
function updateScoreboard() {
    const listEl = document.getElementById('player-list');
    listEl.innerHTML = '';
    players.forEach((p, idx) => {
        let li = document.createElement('li');
        li.innerHTML = `<span class="color-dot" style="background-color: ${p.color}"></span> 
                        <strong>${p.name}</strong>: Petak ${p.pos} ${idx === currentPlayerIndex ? '<em>(Giliran Ini)</em>' : ''}`;
        listEl.appendChild(li);
    });
}

function updateTurnInfo() {
    let currentPlayer = players[currentPlayerIndex];
    document.getElementById('current-player-name').innerText = currentPlayer.name;
    
    if (currentPlayer.skipNext) {
        alert(`${currentPlayer.name} terpaksa melangkau giliran ini kerana gagal menjawab soalan sebelum ini!`);
        currentPlayer.skipNext = false;
        nextTurn();
    }
}

// --- LOGIK LONTAR DADU ---
function rollDice() {
    let rollBtn = document.getElementById('roll-btn');
    rollBtn.disabled = true;

    let diceDisplay = document.getElementById('dice-value');
    let counter = 0;
    let rollAnim = setInterval(() => {
        let tempVal = Math.floor(Math.random() * 6) + 1;
        diceDisplay.innerText = `🎲 ${tempVal}`;
        counter++;
        if (counter > 10) {
            clearInterval(rollAnim);
            diceVal = Math.floor(Math.random() * 6) + 1;
            diceDisplay.innerText = `🎲 ${diceVal}`;
            
            processMovement(diceVal);
        }
    }, 50);
}

// --- PROSES PERGERAKAN PEMAIN ---
function processMovement(steps) {
    let player = players[currentPlayerIndex];
    let targetPos = player.pos + steps;

    if (targetPos > boardSize) {
        targetPos = boardSize;
    }

    player.pos = targetPos;
    updatePlayerTokens();
    updateScoreboard();

    if (player.pos === boardSize) {
        alert(`Tahniah! ${player.name} telah memenangi TeamGame ini! 🎉`);
        location.reload();
        return;
    }

    setTimeout(() => {
        triggerQuiz();
    }, 600);
}

// --- SISTEM KUIZ & SOALAN ---
function triggerQuiz() {
    const modal = document.getElementById('quiz-modal');
    modal.classList.remove('hidden');

    let randomIndex = Math.floor(Math.random() * questionBank.length);
    currentActiveQuestion = questionBank[randomIndex];

    document.getElementById('subject-badge').innerText = currentActiveQuestion.subject;
    document.getElementById('subject-badge').style.backgroundColor = currentActiveQuestion.badgeColor;
    document.getElementById('question-text').innerText = currentActiveQuestion.question;

    let optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';

    currentActiveQuestion.options.forEach((opt, idx) => {
        let btn = document.createElement('button');
        btn.classList.add('option-btn');
        btn.innerText = opt;
        btn.onclick = () => checkAnswer(idx);
        optionsContainer.appendChild(btn);
    });

    timeLeft = 30;
    document.getElementById('time-left').innerText = timeLeft;
    document.getElementById('feedback-message').classList.add('hidden');

    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('time-left').innerText = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            handleWrongAnswer("Masa tamat! Dikira sebagai jawapan salah.");
        }
    }, 1000);
}

// --- SEMAK JAWAPAN ---
function checkAnswer(selectedIndex) {
    clearInterval(timer);
    if (selectedIndex === currentActiveQuestion.answer) {
        handleCorrectAnswer();
    } else {
        handleWrongAnswer("Jawapan anda salah!");
    }
}

function handleCorrectAnswer() {
    let feedback = document.getElementById('feedback-message');
    feedback.innerText = "Tahniah! Jawapan betul. Kekal di petak.";
    feedback.style.color = "#10B981";
    feedback.classList.remove('hidden');

    setTimeout(() => {
        closeQuizAndProceed();
    }, 1500);
}

function handleWrongAnswer(msg) {
    let player = players[currentPlayerIndex];
    let feedback = document.getElementById('feedback-message');
    feedback.innerText = `${msg} Turun 1 petak dan giliran dilangkau!`;
    feedback.style.color = "#EF4444";
    feedback.classList.remove('hidden');

    player.pos = Math.max(1, player.pos - 1);
    player.skipNext = true;

    setTimeout(() => {
        updatePlayerTokens();
        updateScoreboard();
        closeQuizAndProceed();
    }, 2000);
}

function closeQuizAndProceed() {
    document.getElementById('quiz-modal').classList.add('hidden');
    
    let player = players[currentPlayerIndex];
    if (laddersAndSnakes[player.pos]) {
        let oldPos = player.pos;
        let newPos = laddersAndSnakes[oldPos];
        if (newPos > oldPos) {
            alert(`Wah! ${player.name} kena tangga! Naik dari petak ${oldPos} ke ${newPos}.`);
        } else {
            alert(`Aduh! ${player.name} kena ular! Turun dari petak ${oldPos} ke ${newPos}.`);
        }
        player.pos = newPos;
        updatePlayerTokens();
        updateScoreboard();
    }

    nextTurn();
}

// --- TUKAR GILIRAN PEMAIN SETERUSNYA ---
function nextTurn() {
    currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
    document.getElementById('roll-btn').disabled = false;
    updateTurnInfo();
    updateScoreboard();
}