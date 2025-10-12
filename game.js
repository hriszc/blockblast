// ==================== Constants ====================
const BOARD_SIZE = 8;
const GLOBAL_PLAYERS = 10000000;
const TOP_SCORE_ESTIMATE = 10000;
const MEAN_SCORE = TOP_SCORE_ESTIMATE * 0.45; // 20250, median player score
const STD_DEV = TOP_SCORE_ESTIMATE * 0.18; // 8100, standard deviation

const PIECE_SHAPES = [
    [[1]],
    [[1, 1]],
    [[1], [1]],
    [[1, 1, 1]],
    [[1], [1], [1]],
    [[1, 1], [1, 1]],
    [[1, 1, 1], [1, 0, 0]],
    [[1, 1, 1], [0, 0, 1]],
    [[1, 0], [1, 1]],
    [[1, 1, 1, 1]],
    [[1], [1], [1], [1]],
    [[0, 1, 0], [1, 1, 1]]
];

// ==================== Internationalization ====================
const translations = {
    'zh-CN': { 'title': 'Block Blast 游戏', 'header': '🎮 Block Blast', 'scoreLabel': '分数', 'bestScoreLabel': '最高分', 'rankLabel': '全球排名', 'percentileLabel': '分位', 'newGameBtn': '新游戏', 'soundOn': '🔊 音效开', 'soundOff': '🔇 音效关', 'gameOverTitle': '游戏结束！', 'finalScoreLabel': '最终分数', 'tryAgainBtn': '再来一局', 'comboText': 'x 连击! 🎉', 'themeLabel': '深色主题', 'languageLabel': 'Language', 'shareTwitter': '分享到 X', 'copyShare': '复制分享文案', 'shareText': '我在 Block Blast 获得了 {score} 分，全球排名 {rank}！你能超越我吗？🎮', 'copied': '已复制！' },
    'en': { 'title': 'Block Blast Game', 'header': '🎮 Block Blast', 'scoreLabel': 'Score', 'bestScoreLabel': 'Best', 'rankLabel': 'Global Rank', 'percentileLabel': 'Top', 'newGameBtn': 'New Game', 'soundOn': '🔊 Sound On', 'soundOff': '🔇 Sound Off', 'gameOverTitle': 'Game Over!', 'finalScoreLabel': 'Final Score', 'tryAgainBtn': 'Play Again', 'comboText': 'x COMBO! 🎉', 'themeLabel': 'Dark Mode', 'languageLabel': 'Language', 'shareTwitter': 'Share on X', 'copyShare': 'Copy Share Text', 'shareText': 'I scored {score} points on Block Blast, ranked {rank} globally! Can you beat me? 🎮', 'copied': 'Copied!' },
    'es': { 'title': 'Juego Block Blast', 'header': '🎮 Block Blast', 'scoreLabel': 'Puntuación', 'bestScoreLabel': 'Mejor', 'rankLabel': 'Ranking Global', 'percentileLabel': 'Top', 'newGameBtn': 'Nuevo Juego', 'soundOn': '🔊 Sonido On', 'soundOff': '🔇 Sonido Off', 'gameOverTitle': '¡Juego Terminado!', 'finalScoreLabel': 'Puntuación Final', 'tryAgainBtn': 'Jugar de Nuevo', 'comboText': 'x COMBO! 🎉', 'themeLabel': 'Modo Oscuro', 'languageLabel': 'Idioma', 'shareTwitter': 'Compartir en X', 'copyShare': 'Copiar Texto', 'shareText': '¡Obtuve {score} puntos en Block Blast, clasificado {rank} globalmente! ¿Puedes superarme? 🎮', 'copied': '¡Copiado!' },
    'fr': { 'title': 'Jeu Block Blast', 'header': '🎮 Block Blast', 'scoreLabel': 'Score', 'bestScoreLabel': 'Meilleur', 'rankLabel': 'Classement Mondial', 'percentileLabel': 'Top', 'newGameBtn': 'Nouveau Jeu', 'soundOn': '🔊 Son On', 'soundOff': '🔇 Son Off', 'gameOverTitle': 'Jeu Terminé!', 'finalScoreLabel': 'Score Final', 'tryAgainBtn': 'Rejouer', 'comboText': 'x COMBO! 🎉', 'themeLabel': 'Mode Sombre', 'languageLabel': 'Langue', 'shareTwitter': 'Partager sur X', 'copyShare': 'Copier le Texte', 'shareText': 'J\'ai marqué {score} points sur Block Blast, classé {rank} mondialement! Pouvez-vous me battre? 🎮', 'copied': 'Copié!' },
    'de': { 'title': 'Block Blast Spiel', 'header': '🎮 Block Blast', 'scoreLabel': 'Punktzahl', 'bestScoreLabel': 'Beste', 'rankLabel': 'Weltweiter Rang', 'percentileLabel': 'Top', 'newGameBtn': 'Neues Spiel', 'soundOn': '🔊 Ton An', 'soundOff': '🔇 Ton Aus', 'gameOverTitle': 'Spiel Vorbei!', 'finalScoreLabel': 'Endpunktzahl', 'tryAgainBtn': 'Nochmal Spielen', 'comboText': 'x COMBO! 🎉', 'themeLabel': 'Dunkler Modus', 'languageLabel': 'Sprache', 'shareTwitter': 'Auf X Teilen', 'copyShare': 'Text Kopieren', 'shareText': 'Ich habe {score} Punkte in Block Blast erzielt, weltweit auf Platz {rank}! Kannst du mich schlagen? 🎮', 'copied': 'Kopiert!' },
    'ja': { 'title': 'Block Blast ゲーム', 'header': '🎮 Block Blast', 'scoreLabel': 'スコア', 'bestScoreLabel': 'ベスト', 'rankLabel': '世界ランキング', 'percentileLabel': 'トップ', 'newGameBtn': '新しいゲーム', 'soundOn': '🔊 サウンド オン', 'soundOff': '🔇 サウンド オフ', 'gameOverTitle': 'ゲームオーバー！', 'finalScoreLabel': '最終スコア', 'tryAgainBtn': 'もう一度プレイ', 'comboText': 'x コンボ! 🎉', 'themeLabel': 'ダークモード', 'languageLabel': '言語', 'shareTwitter': 'Xでシェア', 'copyShare': 'テキストをコピー', 'shareText': 'Block Blastで{score}点を獲得し、世界{rank}位にランクイン！あなたは私を超えられますか？🎮', 'copied': 'コピーしました！' },
    'ko': { 'title': 'Block Blast 게임', 'header': '🎮 Block Blast', 'scoreLabel': '점수', 'bestScoreLabel': '최고', 'rankLabel': '글로벌 순위', 'percentileLabel': '상위', 'newGameBtn': '새 게임', 'soundOn': '🔊 사운드 켜기', 'soundOff': '🔇 사운드 끄기', 'gameOverTitle': '게임 오버!', 'finalScoreLabel': '최종 점수', 'tryAgainBtn': '다시 플레이', 'comboText': 'x 콤보! 🎉', 'themeLabel': '다크 모드', 'languageLabel': '언어', 'shareTwitter': 'X에 공유', 'copyShare': '텍스트 복사', 'shareText': 'Block Blast에서 {score}점을 획득하고 전 세계 {rank}위를 기록했습니다! 당신은 저를 이길 수 있나요? 🎮', 'copied': '복사됨!' },
    'pt': { 'title': 'Jogo Block Blast', 'header': '🎮 Block Blast', 'scoreLabel': 'Pontuação', 'bestScoreLabel': 'Melhor', 'rankLabel': 'Ranking Global', 'percentileLabel': 'Top', 'newGameBtn': 'Novo Jogo', 'soundOn': '🔊 Som Ligado', 'soundOff': '🔇 Som Desligado', 'gameOverTitle': 'Jogo Acabou!', 'finalScoreLabel': 'Pontuação Final', 'tryAgainBtn': 'Jogar Novamente', 'comboText': 'x COMBO! 🎉', 'themeLabel': 'Modo Escuro', 'languageLabel': 'Idioma', 'shareTwitter': 'Compartilhar no X', 'copyShare': 'Copiar Texto', 'shareText': 'Fiz {score} pontos no Block Blast, classificado {rank} globalmente! Você pode me superar? 🎮', 'copied': 'Copiado!' },
    'ru': { 'title': 'Игра Block Blast', 'header': '🎮 Block Blast', 'scoreLabel': 'Счёт', 'bestScoreLabel': 'Лучший', 'rankLabel': 'Мировой Рейтинг', 'percentileLabel': 'Топ', 'newGameBtn': 'Новая Игра', 'soundOn': '🔊 Звук Вкл', 'soundOff': '🔇 Звук Выкл', 'gameOverTitle': 'Игра Окончена!', 'finalScoreLabel': 'Финальный Счёт', 'tryAgainBtn': 'Играть Снова', 'comboText': 'x КОМБО! 🎉', 'themeLabel': 'Тёмный Режим', 'languageLabel': 'Язык', 'shareTwitter': 'Поделиться в X', 'copyShare': 'Скопировать Текст', 'shareText': 'Я набрал {score} очков в Block Blast, занял {rank} место в мире! Сможешь меня обыграть? 🎮', 'copied': 'Скопировано!' },
    'ar': { 'title': 'لعبة Block Blast', 'header': '🎮 Block Blast', 'scoreLabel': 'النقاط', 'bestScoreLabel': 'الأفضل', 'rankLabel': 'الترتيب العالمي', 'percentileLabel': 'الأعلى', 'newGameBtn': 'لعبة جديدة', 'soundOn': '🔊 الصوت مفعل', 'soundOff': '🔇 الصوت مغلق', 'gameOverTitle': 'انتهت اللعبة!', 'finalScoreLabel': 'النقاط النهائية', 'tryAgainBtn': 'العب مرة أخرى', 'comboText': 'x كومبو! 🎉', 'themeLabel': 'الوضع الداكن', 'languageLabel': 'اللغة', 'shareTwitter': 'مشاركة على X', 'copyShare': 'نسخ النص', 'shareText': 'حصلت على {score} نقطة في Block Blast، المرتبة {rank} عالميًا! هل يمكنك التغلب علي؟ 🎮', 'copied': 'تم النسخ!' }
};

// ==================== Game State ====================
let board = [];
let score = 0;
let bestScore = localStorage.getItem('blockBlastBestScore') || 0;
let currentPieces = [];
let selectedPiece = null;
let previewCells = [];
let isDragging = false;
let dragGhost = null;
let soundEnabled = true;
let currentLang = detectBrowserLanguage();

// ==================== DOM Elements ====================
const rankEl = document.getElementById('global-rank');
const percentileEl = document.getElementById('percentile');
const soundBtn = document.getElementById('sound-btn');
const themeToggle = document.getElementById('theme-toggle');
const langSelect = document.getElementById('lang-select');
const newGameBtn = document.getElementById('new-game-btn');
const tryAgainBtn = document.getElementById('try-again-btn');
const shareTwitterBtn = document.getElementById('share-twitter-btn');
const copyShareBtn = document.getElementById('copy-share-btn');
const rankDisplayEl = document.getElementById('rank-display');

// ==================== Audio ====================
let audioContext;
try {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
} catch(e) {
    console.error('Web Audio API is not supported in this browser.');
}

function playSound(frequency, duration, type = 'sine') {
    if (!soundEnabled || !audioContext) return;
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    oscillator.frequency.value = frequency;
    oscillator.type = type;
    gainNode.gain.setValueAtTime(audioContext.currentTime, 0);
    gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration);
}

function playPlaceSound() { playSound(440, 0.1); }
function playClearSound() { playSound(660, 0.15); setTimeout(() => playSound(880, 0.15), 80); }
function playErrorSound() { playSound(220, 0.2, 'square'); }
function playComboSound(combo) { 
    for (let i = 0; i < combo; i++) { 
        setTimeout(() => { playSound(800 + i * 150, 0.12); }, i * 80); 
    } 
}

// ==================== Language Detection ====================
function detectBrowserLanguage() {
    const browserLang = navigator.language || navigator.userLanguage;
    const langCode = browserLang.toLowerCase();
    
    if (translations[browserLang]) return browserLang;
    if (translations[langCode]) return langCode;
    
    const baseLang = langCode.split('-')[0];
    const langMap = {
        'zh': 'zh-CN', 'zh-cn': 'zh-CN', 'zh-tw': 'zh-CN', 'zh-hk': 'zh-CN',
        'en': 'en', 'es': 'es', 'fr': 'fr', 'de': 'de',
        'ja': 'ja', 'ko': 'ko', 'pt': 'pt', 'ru': 'ru', 'ar': 'ar'
    };
    
    return langMap[langCode] || langMap[baseLang] || 'en';
}

function setLanguage(lang) {
    if (lang === 'zh') lang = 'zh-CN';
    if (!translations[lang]) lang = 'en';
    
    currentLang = lang;
    localStorage.setItem('blockBlastLang', lang);
    langSelect.value = lang;
    
    const htmlLangMap = {
        'zh-CN': 'zh-CN', 'en': 'en', 'es': 'es', 'fr': 'fr', 'de': 'de',
        'ja': 'ja', 'ko': 'ko', 'pt': 'pt', 'ru': 'ru', 'ar': 'ar'
    };
    document.documentElement.lang = htmlLangMap[lang] || 'en';
    
    document.documentElement.dir = (lang === 'ar') ? 'rtl' : 'ltr';
    
    document.querySelectorAll('[data-lang-key]').forEach(el => {
        const key = el.dataset.langKey;
        if (translations[lang][key]) el.textContent = translations[lang][key];
    });

    document.title = translations[lang].title;
    updateSoundButtonText();
    updateGlobalRank();
}

// ==================== Settings ====================
function updateSoundButtonText() {
    soundBtn.textContent = soundEnabled ? translations[currentLang].soundOn : translations[currentLang].soundOff;
    soundBtn.classList.toggle('muted', !soundEnabled);
}

function toggleSound() {
    soundEnabled = !soundEnabled;
    localStorage.setItem('blockBlastSound', soundEnabled);
    updateSoundButtonText();
}

function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    localStorage.setItem('blockBlastTheme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
}

function loadSettings() {
    const savedTheme = localStorage.getItem('blockBlastTheme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        themeToggle.checked = true;
    } else {
        document.body.classList.remove('dark-theme');
        themeToggle.checked = false;
    }

    const savedLang = localStorage.getItem('blockBlastLang');
    if (savedLang) {
        setLanguage(savedLang);
    } else {
        setLanguage(detectBrowserLanguage());
    }

    const savedSound = localStorage.getItem('blockBlastSound');
    soundEnabled = savedSound === null ? true : savedSound === 'true';
    updateSoundButtonText();
}

// ==================== Rendering ====================
function renderBoard() {
    const boardElement = document.getElementById('game-board');
    boardElement.innerHTML = '';
    for (let i = 0; i < BOARD_SIZE; i++) {
        for (let j = 0; j < BOARD_SIZE; j++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            if (board[i][j]) cell.classList.add('filled');
            cell.dataset.row = i;
            cell.dataset.col = j;
            boardElement.appendChild(cell);
        }
    }
}

function createPieceDOM(shape) {
    const piece = document.createElement('div');
    piece.className = 'piece';
    piece.style.gridTemplateColumns = `repeat(${shape[0].length}, 1fr)`;
    shape.forEach(row => row.forEach(cell => {
        const cellDiv = document.createElement('div');
        cellDiv.className = 'piece-cell';
        if (cell) cellDiv.classList.add('filled');
        piece.appendChild(cellDiv);
    }));
    return piece;
}

function showCombo(combo) {
    const indicator = document.getElementById('combo-indicator');
    indicator.textContent = `${combo}${translations[currentLang].comboText}`;
    indicator.style.display = 'block';
    setTimeout(() => { indicator.style.display = 'none'; }, 1000);
}

// ==================== Game Logic ====================
function generateNewPieces() {
    currentPieces = [];
    const piecesContainer = document.getElementById('pieces-container');
    piecesContainer.innerHTML = '';
    
    for (let i = 0; i < 3; i++) {
        const shape = PIECE_SHAPES[Math.floor(Math.random() * PIECE_SHAPES.length)];
        currentPieces.push({ shape, used: false, id: i });
        const wrapper = document.createElement('div');
        wrapper.className = 'piece-wrapper';
        wrapper.dataset.id = i;
        wrapper.addEventListener('mousedown', (e) => startDrag(e, i));
        wrapper.addEventListener('touchstart', (e) => startDrag(e, i), { passive: false });
        wrapper.appendChild(createPieceDOM(shape));
        piecesContainer.appendChild(wrapper);
    }
    
    // [FIX] Check for game over after generating new pieces
    setTimeout(() => {
        if (!hasValidMoves()) {
            gameOver();
        }
    }, 100);
}

function canPlacePiece(row, col, shape) {
    for (let i = 0; i < shape.length; i++) {
        for (let j = 0; j < shape[i].length; j++) {
            if (shape[i][j]) {
                const r = row + i, c = col + j;
                if (r >= BOARD_SIZE || c >= BOARD_SIZE || board[r][c]) return false;
            }
        }
    }
    return true;
}

function hasValidMoves() {
    const availablePieces = currentPieces.filter(p => !p.used);
    // [FIX] Removed the incorrect "return true" when no pieces available
    for (let piece of availablePieces) {
        for (let i = 0; i < BOARD_SIZE; i++) {
            for (let j = 0; j < BOARD_SIZE; j++) {
                if (canPlacePiece(i, j, piece.shape)) return true;
            }
        }
    }
    return false;
}

function placePiece(row, col) {
    const shape = currentPieces[selectedPiece].shape;
    if (!canPlacePiece(row, col, shape)) {
        playErrorSound();
        return;
    }
    
    playPlaceSound();
    
    for (let i = 0; i < shape.length; i++) {
        for (let j = 0; j < shape[i].length; j++) {
            if (shape[i][j]) board[row + i][col + j] = 1;
        }
    }

    currentPieces[selectedPiece].used = true;
    document.querySelector(`[data-id="${selectedPiece}"]`).classList.add('used');
    score += shape.flat().filter(x => x).length;
    updateScore();
    renderBoard();
    selectedPiece = null;
    clearPreview();
    
    setTimeout(() => {
        const linesCleared = clearLines();
        if (linesCleared > 0) {
            playClearSound();
            if (linesCleared > 1) {
                playComboSound(linesCleared);
                showCombo(linesCleared);
            }
            score += linesCleared * 100 + (linesCleared - 1) * 50;
            updateScore();
        }
        
        // [FIX] Check game over logic after line clearing
        const allUsed = currentPieces.every(p => p.used);
        if (allUsed) {
            // Generate new pieces (will check game over inside generateNewPieces)
            setTimeout(() => generateNewPieces(), 200);
        } else {
            // Check game over if there are still pieces but no valid moves
            setTimeout(() => {
                if (!hasValidMoves()) gameOver();
            }, 100);
        }
    }, 100);
}

function clearLines() {
    let linesToClear = { rows: [], cols: [] };
    
    for(let i=0; i<BOARD_SIZE; i++) {
        if(board[i].every(cell => cell === 1)) linesToClear.rows.push(i);
        if(board.every(row => row[i] === 1)) linesToClear.cols.push(i);
    }
    
    const cellsToClear = new Set();
    linesToClear.rows.forEach(i => {
        for(let j=0; j<BOARD_SIZE; j++) cellsToClear.add(`${i},${j}`);
    });
    linesToClear.cols.forEach(j => {
        for(let i=0; i<BOARD_SIZE; i++) cellsToClear.add(`${i},${j}`);
    });

    cellsToClear.forEach(pos => {
        const [i, j] = pos.split(',');
        document.querySelector(`[data-row="${i}"][data-col="${j}"]`)?.classList.add('clearing');
    });

    if (cellsToClear.size > 0) {
        setTimeout(() => {
            cellsToClear.forEach(pos => {
                const [i, j] = pos.split(',');
                board[i][j] = 0;
            });
            renderBoard();
        }, 450);
    }

    return linesToClear.rows.length + linesToClear.cols.length;
}

// ==================== Drag & Drop ====================
function startDrag(e, pieceId) {
    if (currentPieces[pieceId].used) return;
    e.preventDefault();
    isDragging = true;
    selectedPiece = pieceId;
    
    const wrapper = document.querySelector(`[data-id="${pieceId}"]`);
    wrapper.classList.add('dragging');
    
    dragGhost = document.createElement('div');
    dragGhost.className = 'drag-ghost';
    dragGhost.appendChild(createPieceDOM(currentPieces[pieceId].shape));
    document.body.appendChild(dragGhost);
    
    document.addEventListener('mousemove', onDragMove);
    document.addEventListener('touchmove', onDragMove, { passive: false });
    document.addEventListener('mouseup', onDragEnd);
    document.addEventListener('touchend', onDragEnd);
    
    const clientX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
    const clientY = e.type === 'touchstart' ? e.touches[0].clientY : e.clientY;
    updateDragGhostPosition(clientX, clientY);
}

function updateDragGhostPosition(clientX, clientY) {
    if (!dragGhost) return;
    const rect = dragGhost.getBoundingClientRect();
    dragGhost.style.transform = `translate(${(clientX - rect.width / 2)}px, ${(clientY - rect.height / 2)}px)`;
}

function onDragMove(e) {
    if (!isDragging) return;
    e.preventDefault();
    
    const clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
    const clientY = e.type === 'touchmove' ? e.touches[0].clientY : e.clientY;
    updateDragGhostPosition(clientX, clientY);
    
    dragGhost.style.display = 'none';
    const cell = document.elementsFromPoint(clientX, clientY).find(el => el.classList.contains('cell'));
    dragGhost.style.display = 'block';
    
    clearPreview();
    if (cell) showPreview(parseInt(cell.dataset.row), parseInt(cell.dataset.col));
}

function onDragEnd(e) {
    if (!isDragging) return;
    
    const clientX = e.type === 'touchend' ? e.changedTouches[0].clientX : e.clientX;
    const clientY = e.type === 'touchend' ? e.changedTouches[0].clientY : e.clientY;
    
    dragGhost.style.display = 'none';
    const cell = document.elementsFromPoint(clientX, clientY).find(el => el.classList.contains('cell'));
    
    if (cell) {
        placePiece(parseInt(cell.dataset.row), parseInt(cell.dataset.col));
    } else {
        playErrorSound();
    }

    const wrapper = document.querySelector(`[data-id="${selectedPiece}"]`);
    if (wrapper) wrapper.classList.remove('dragging');
    if (dragGhost) dragGhost.remove();
    dragGhost = null;
    clearPreview();
    isDragging = false;
    selectedPiece = null;
    
    document.removeEventListener('mousemove', onDragMove);
    document.removeEventListener('touchmove', onDragMove);
    document.removeEventListener('mouseup', onDragEnd);
    document.removeEventListener('touchend', onDragEnd);
}

function showPreview(row, col) {
    clearPreview();
    if (selectedPiece === null) return;
    
    const shape = currentPieces[selectedPiece].shape;
    const valid = canPlacePiece(row, col, shape);
    previewCells = [];
    
    for (let i = 0; i < shape.length; i++) {
        for (let j = 0; j < shape[i].length; j++) {
            if (shape[i][j]) {
                const r = row + i, c = col + j;
                if (r < BOARD_SIZE && c < BOARD_SIZE) {
                    const cell = document.querySelector(`[data-row="${r}"][data-col="${c}"]`);
                    if (cell) {
                        cell.classList.add(valid ? 'preview' : 'invalid');
                        previewCells.push(cell);
                    }
                }
            }
        }
    }
}

function clearPreview() {
    previewCells.forEach(cell => cell.classList.remove('preview', 'invalid'));
    previewCells = [];
}

// ==================== Normal Distribution Helper ====================
function erf(x) {
    const sign = x >= 0 ? 1 : -1;
    x = Math.abs(x);
    const a1 = 0.254829592;
    const a2 = -0.284496736;
    const a3 = 1.421413741;
    const a4 = -1.453152027;
    const a5 = 1.061405429;
    const p = 0.3275911;
    const t = 1.0 / (1.0 + p * x);
    const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
    return sign * y;
}

function normalCDF(x, mean, stdDev) {
    return 0.5 * (1 + erf((x - mean) / (stdDev * Math.sqrt(2))));
}

// ==================== Score & Ranking ====================
function updateScore() {
    document.getElementById('score').textContent = score;
    if (score > bestScore) {
        bestScore = score;
        localStorage.setItem('blockBlastBestScore', bestScore);
        document.getElementById('best-score').textContent = bestScore;
        updateGlobalRank();
    }
}

function updateGlobalRank() {
    if (bestScore == 0) {
        rankEl.textContent = '--';
        percentileEl.textContent = '--';
        return;
    }
    
    // Use normal distribution: most players at median, fewer at extremes
    const percentile = normalCDF(bestScore, MEAN_SCORE, STD_DEV);
    const rank = Math.max(1, Math.floor(GLOBAL_PLAYERS * (1 - percentile)));

    const localeMap = {
        'zh-CN': 'zh-CN', 'en': 'en-US', 'es': 'es-ES', 'fr': 'fr-FR', 'de': 'de-DE',
        'ja': 'ja-JP', 'ko': 'ko-KR', 'pt': 'pt-BR', 'ru': 'ru-RU', 'ar': 'ar-SA'
    };
    rankEl.textContent = `#${rank.toLocaleString(localeMap[currentLang] || 'en-US')}`;
    
    const topPercent = (1 - percentile) * 100;
    const percentText = topPercent < 0.01 ? '0.01' : topPercent.toFixed(2);
    
    if (currentLang === 'zh-CN') {
        percentileEl.textContent = `前${percentText}%`;
    } else {
        percentileEl.textContent = `${percentText}%`;
    }
}

// ==================== Share Functions ====================
function calculateCurrentRank() {
    if (score === 0) return null;
    
    // Use normal distribution for realistic player distribution
    const percentile = normalCDF(score, MEAN_SCORE, STD_DEV);
    const rank = Math.max(1, Math.floor(GLOBAL_PLAYERS * (1 - percentile)));
    
    return rank;
}

function generateShareText() {
    const rank = calculateCurrentRank();
    if (!rank) return '';
    
    const localeMap = {
        'zh-CN': 'zh-CN', 'en': 'en-US', 'es': 'es-ES', 'fr': 'fr-FR', 'de': 'de-DE',
        'ja': 'ja-JP', 'ko': 'ko-KR', 'pt': 'pt-BR', 'ru': 'ru-RU', 'ar': 'ar-SA'
    };
    
    const formattedRank = `#${rank.toLocaleString(localeMap[currentLang] || 'en-US')}`;
    const shareTemplate = translations[currentLang].shareText;
    
    return shareTemplate
        .replace('{score}', score)
        .replace('{rank}', formattedRank) + '\n\nhttps://block-blast.io/';
}

function shareToTwitter() {
    const text = generateShareText();
    if (!text) return;
    
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(twitterUrl, '_blank', 'width=550,height=420');
}

function copyShareText() {
    const text = generateShareText();
    if (!text) return;
    
    navigator.clipboard.writeText(text).then(() => {
        const originalText = copyShareBtn.querySelector('span').textContent;
        copyShareBtn.classList.add('copied');
        copyShareBtn.querySelector('span').textContent = translations[currentLang].copied;
        
        setTimeout(() => {
            copyShareBtn.classList.remove('copied');
            copyShareBtn.querySelector('span').textContent = originalText;
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy:', err);
        alert('Failed to copy to clipboard');
    });
}

// ==================== Game State Management ====================
function initGame() {
    board = Array(BOARD_SIZE).fill().map(() => Array(BOARD_SIZE).fill(0));
    score = 0;
    document.getElementById('best-score').textContent = bestScore;
    
    loadSettings();
    updateScore();
    updateGlobalRank();
    renderBoard();
    generateNewPieces();
}

function gameOver() {
    document.getElementById('final-score').textContent = score;
    
    // Display rank information
    const rank = calculateCurrentRank();
    if (rank) {
        const localeMap = {
            'zh-CN': 'zh-CN', 'en': 'en-US', 'es': 'es-ES', 'fr': 'fr-FR', 'de': 'de-DE',
            'ja': 'ja-JP', 'ko': 'ko-KR', 'pt': 'pt-BR', 'ru': 'ru-RU', 'ar': 'ar-SA'
        };
        const formattedRank = `#${rank.toLocaleString(localeMap[currentLang] || 'en-US')}`;
        
        if (currentLang === 'zh-CN') {
            rankDisplayEl.textContent = `全球排名: ${formattedRank}`;
        } else if (currentLang === 'en') {
            rankDisplayEl.textContent = `Global Rank: ${formattedRank}`;
        } else if (currentLang === 'es') {
            rankDisplayEl.textContent = `Ranking Global: ${formattedRank}`;
        } else if (currentLang === 'fr') {
            rankDisplayEl.textContent = `Classement Mondial: ${formattedRank}`;
        } else if (currentLang === 'de') {
            rankDisplayEl.textContent = `Weltweiter Rang: ${formattedRank}`;
        } else if (currentLang === 'ja') {
            rankDisplayEl.textContent = `世界ランキング: ${formattedRank}`;
        } else if (currentLang === 'ko') {
            rankDisplayEl.textContent = `글로벌 순위: ${formattedRank}`;
        } else if (currentLang === 'pt') {
            rankDisplayEl.textContent = `Ranking Global: ${formattedRank}`;
        } else if (currentLang === 'ru') {
            rankDisplayEl.textContent = `Мировой Рейтинг: ${formattedRank}`;
        } else if (currentLang === 'ar') {
            rankDisplayEl.textContent = `الترتيب العالمي: ${formattedRank}`;
        }
    } else {
        rankDisplayEl.textContent = '';
    }
    
    document.getElementById('game-over').style.display = 'flex';
    playSound(300, 0.4, 'sawtooth');
    setTimeout(()=>playSound(200, 0.5, 'sawtooth'), 100);
}

function newGame() {
    document.getElementById('game-over').style.display = 'none';
    initGame();
}

// ==================== Event Listeners ====================
themeToggle.addEventListener('change', toggleTheme);
langSelect.addEventListener('change', (e) => setLanguage(e.target.value));
soundBtn.addEventListener('click', toggleSound);
newGameBtn.addEventListener('click', newGame);
tryAgainBtn.addEventListener('click', newGame);
shareTwitterBtn.addEventListener('click', shareToTwitter);
copyShareBtn.addEventListener('click', copyShareText);

// ==================== Initialize ====================
initGame();
