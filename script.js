const questions = [
    {
        question: "Qual boss precisa ser derrotado para liberar o Modo Difícil (Hardmode) no mundo?",
        options: ["Skeletron", "Wall of Flesh (Parede de Carne)", "Eye of Cthulhu", "Queen Bee"],
        answer: 1,
        explanation: "Derrotar a Wall of Flesh no Submundo libera os antigos espíritos da luz e das trevas, iniciando o Hardmode."
    },
    {
        question: "Qual item é usado para invocar o Duke Fishron?",
        options: ["Suspicious Looking Eye", "Mechanical Worm", "Truffle Worm (Verme da Trufa)", "Lihzahrd Power Cell"],
        answer: 2,
        explanation: "Você precisa pescar no Oceano usando o Truffle Worm como isca para invocar o Duke Fishron."
    },
    {
        question: "Qual é a espada final mais poderosa do jogo, criada pela combinação de várias outras espadas?",
        options: ["Terra Blade", "Meowmere", "Star Wrath", "Zenith"],
        answer: 3,
        explanation: "A Zenith combina espadas de toda a progressão do jogo, desde a Copper Shortsword até a Meowmere e Star Wrath."
    },
    {
        question: "Qual NPC vende o Clentaminator, usado para espalhar ou purificar biomas?",
        options: ["Steampunker", "Cyborg", "Wizard", "Goblin Tinkerer"],
        answer: 0,
        explanation: "A Steampunker aparece após derrotar pelo menos um Boss Mecânico e vende o Clentaminator por 2 moedas de Platina."
    },
    {
        question: "Qual destes itens aumenta permanentemente a vida máxima do jogador de 400 para até 500?",
        options: ["Life Crystal", "Life Fruit (Fruta da Vida)", "Mana Crystal", "Aegis Fruit"],
        answer: 1,
        explanation: "As Life Fruits crescem na Selva Subterrânea no Hardmode e aumentam 5 de vida cada, até o limite de 500."
    },
    {
        question: "Onde você encontra os crânios necessários para invocar o Skeletron?",
        options: ["Na entrada da Dungeon (Masmorra)", "No bioma de Neve", "Nas Ilhas Flutuantes", "No Templo da Selva"],
        answer: 0,
        explanation: "Falando com o Old Man (Velho) na entrada da Dungeon durante a noite você invoca o Skeletron."
    },
    {
        question: "Qual classe de combate utiliza chicotes (Whips) para focar o dano de seus lacaios?",
        options: ["Melee (Guerreiro)", "Ranger (Atirador)", "Mage (Mago)", "Summoner (Invocador)"],
        answer: 3,
        explanation: "Os chicotes dão dano de invocação, aplicam efeitos extras e fazem seus minions focarem no inimigo atingido."
    },
    {
        question: "O que acontece se você entrar na Dungeon antes de derrotar o Skeletron?",
        options: ["A porta fica trancada", "O Dungeon Guardian aparece e mata o jogador com um golpe", "Você é teleportado para o spawn", "Nada acontece"],
        answer: 1,
        explanation: "Ao descer abaixo da profundidade zero na Dungeon sem matar o Skeletron, o Dungeon Guardian surge em alta velocidade."
    },
    {
        question: "Qual minério do Hardmode pode aparecer quando você quebra altares demoníacos/carmesins (junto com Palladio)?",
        options: ["Cobalt (Cobalto)", "Chlorophyte (Clorofita)", "Luminite", "Hellstone"],
        answer: 0,
        explanation: "Quebrar o primeiro altar gera Cobalt ou Palladium no subsolo do mundo."
    },
    {
        question: "Quem é o boss final oficial da progressão principal do Terraria?",
        options: ["Empress of Light", "Lunatic Cultist", "Moon Lord (Senhor da Lua)", "Golem"],
        answer: 2,
        explanation: "Após derrotar o Lunatic Cultist e os quatro Pilares Celestiais, o Moon Lord aparece como o desafio final."
    }
];

let currentQuestionIndex = 0;
let score = 0;

const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const feedbackContainer = document.getElementById("feedback-container");
const feedbackText = document.getElementById("feedback-text");
const nextBtn = document.getElementById("next-btn");
const progressText = document.getElementById("progress");
const quizBox = document.getElementById("quiz-box");
const resultBox = document.getElementById("result-box");
const scoreText = document.getElementById("score-text");
const rankText = document.getElementById("rank-text");
const restartBtn = document.getElementById("restart-btn");

function loadQuestion() {
    feedbackContainer.classList.add("hidden");
    optionsContainer.innerHTML = "";

    const currentQuestion = questions[currentQuestionIndex];
    progressText.textContent = `Pergunta ${currentQuestionIndex + 1} de ${questions.length}`;
    questionText.textContent = currentQuestion.question;

    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.textContent = option;
        button.classList.add("option-btn");
        button.addEventListener("click", () => selectAnswer(index, button));
        optionsContainer.appendChild(button);
    });
}

function selectAnswer(selectedIndex, selectedButton) {
    const currentQuestion = questions[currentQuestionIndex];
    const allButtons = document.querySelectorAll(".option-btn");

    allButtons.forEach(btn => btn.disabled = true);

    if (selectedIndex === currentQuestion.answer) {
        selectedButton.classList.add("correct");
        score++;
        feedbackText.textContent = `✅ Correto! ${currentQuestion.explanation}`;
    } else {
        selectedButton.classList.add("wrong");
        allButtons[currentQuestion.answer].classList.add("correct");
        feedbackText.textContent = `❌ Errado! ${currentQuestion.explanation}`;
    }

    feedbackContainer.classList.remove("hidden");
}

nextBtn.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showResults();
    }
});

function showResults() {
    quizBox.classList.add("hidden");
    progressText.classList.add("hidden");
    resultBox.classList.remove("hidden");

    scoreText.textContent = `Você acertou ${score} de ${questions.length} perguntas!`;

    if (score === questions.length) {
        rankText.textContent = "Rank: Portador da Zenith! Você domina tudo sobre Terraria!";
    } else if (score >= 7) {
        rankText.textContent = "Rank: Veterano do Hardmode! Ótimo conhecimento!";
    } else if (score >= 4) {
        rankText.textContent = "Rank: Explorador das Cavernas! Ainda há muito para descobrir.";
    } else {
        rankText.textContent = "Rank: Recém-chegado com Copper Shortsword! Hora de falar com o Guia.";
    }
}

restartBtn.addEventListener("click", () => {
    currentQuestionIndex = 0;
    score = 0;
    resultBox.classList.add("hidden");
    quizBox.classList.remove("hidden");
    progressText.classList.remove("hidden");
    loadQuestion();
});

loadQuestion();
