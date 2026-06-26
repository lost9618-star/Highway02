// 음운체계 퀴즈 데이터 (질문, 보기, 정답 인덱스, 피드백 해설)
const quizData = [
    {
        question: "다음 중 발음할 때 공기의 흐름이 발음 기관의 방해를 받고 나오는 음운은 무엇일까요?",
        options: ["① ㅏ", "② ㅓ", "③ ㅁ", "④ ㅗ"],
        answer: 2, // 'ㅁ'은 자음(방해를 받음)
        explanation: "자음(ㅁ)은 발음 기관의 방해를 받고 나는 소리이며, 모음(ㅏ, ㅓ, ㅗ)은 방해를 받지 않고 순탄하게 나오는 소리입니다."
    },
    {
        question: "국어의 자음 체계에서 두 입술 사이에서 나는 소리(순음)로만 짝지어진 것은 무엇일까요?",
        options: ["① ㄱ, ㅋ", "② ㅂ, ㅁ, ㅍ", "③ ㄷ, ㅌ, ㄴ", "④ ㅅ, ㅈ"],
        answer: 1,
        explanation: "'ㅂ, ㅃ, ㅍ, ㅁ'은 두 입술이 맞닿아 나는 입술소리(순음)입니다."
    },
    {
        question: "다음 모음 중 발음할 때 입술의 모양이나 혀의 위치가 변하지 않는 '단모음'이 아닌 것은?",
        options: ["① ㅣ", "② ㅐ", "③ ㅜ", "④ ㅑ"],
        answer: 3,
        explanation: "'ㅑ'는 발음할 때 'ㅣ'에서 'ㅏ'로 입술 모양과 혀의 위치가 변하는 이중모음입니다."
    },
    {
        question: "자음 'ㄱ, ㄷ, ㅂ'처럼 목청이 떨리지 않고 나오는 소리를 무엇이라고 부를까요?",
        options: ["① 울림소리(유성음)", "② 안울림소리(무성음)", "③ 거센소리(격음)", "④ 된소리(농음)"],
        answer: 1,
        explanation: "국어의 자음 중 'ㄴ, ㄹ, ㅁ, ㅇ'과 모든 모음은 울림소리이며, 'ㄱ, ㄷ, ㅂ, ㅅ, ㅈ, ㅊ, ㅋ, ㅌ, ㅍ, ㅎ' 등은 안울림소리입니다."
    },
    {
        question: "혀의 최고점의 위치가 앞쪽에 있고, 입술 모양이 평평한 '전설 평순 모음'에 해당하는 것은?",
        options: ["① ㅡ", "② ㅏ", "③ ㅣ", "④ ㅗ"],
        answer: 2,
        explanation: "'ㅣ'는 혀의 위치가 앞(전설)에 있고 입술을 평평하게 벌리는(평순) 대표적인 모음입니다."
    }
];

let currentQuestionIndex = 0;
let score = 0;

// HTML 요소 가져오기
const quizBox = document.getElementById("quiz-box");
const scoreBox = document.getElementById("score-box");
const questionElement = document.getElementById("question");
const optionsContainer = document.getElementById("options");
const currentNumElement = document.getElementById("current-num");
const totalNumElement = document.getElementById("total-num");
const progressElement = document.getElementById("progress");
const resultMessage = document.getElementById("result-message");

// 퀴즈 시작 시 셋팅
totalNumElement.textContent = quizData.length;
loadQuestion();

function loadQuestion() {
    // 메시지 및 이전 보기 초기화
    resultMessage.classList.add("hidden");
    resultMessage.textContent = "";
    optionsContainer.innerHTML = "";

    // 현재 문제 데이터 가져오기
    const currentQuiz = quizData[currentQuestionIndex];
    
    // 문제 번호 및 텍스트 표시
    currentNumElement.textContent = currentQuestionIndex + 1;
    questionElement.textContent = currentQuiz.question;
    
    // 진행바 업데이트
    const progressPercent = ((currentQuestionIndex) / quizData.length) * 100;
    progressElement.style.width = `${progressPercent}%`;

    // 보기 버튼 동적 생성
    currentQuiz.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.textContent = option;
        button.classList.add("option-btn");
        button.addEventListener("click", () => selectOption(index));
        optionsContainer.appendChild(button);
    });
}

function selectOption(selectedIndex) {
    const currentQuiz = quizData[currentQuestionIndex];
    const buttons = optionsContainer.querySelectorAll(".option-btn");
    
    // 한 번 선택하면 다른 버튼 비활성화
    buttons.forEach(button => button.disabled = true);

    if (selectedIndex === currentQuiz.answer) {
        // 정답인 경우
        buttons[selectedIndex].classList.add("correct");
        resultMessage.textContent = `⭕ 정답입니다! ${currentQuiz.explanation}`;
        resultMessage.className = "result-message correct-msg";
        score++;
    } else {
        // 오답인 경우
        buttons[selectedIndex].classList.add("wrong");
        buttons[currentQuiz.answer].classList.add("correct"); // 정답도 함께 보여줌
        resultMessage.textContent = `❌ 아쉬워요! 정답은 ${selectedIndex + 1}번이 아닙니다. \n[해설] ${currentQuiz.explanation}`;
        resultMessage.className = "result-message wrong-msg";
    }
    
    resultMessage.classList.remove("hidden");

    // 2.5초 후에 다음 문제로 넘어가기 (학생들이 해설을 읽을 시간 부여)
    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizData.length) {
            loadQuestion();
        } else {
            showScore();
        }
    }, 3000);
}

function showScore() {
    progressElement.style.width = "100%";
    quizBox.classList.add("hidden");
    scoreBox.classList.remove("hidden");
    
    const finalScore = Math.round((score / quizData.length) * 100);
    document.getElementById("score-text").innerHTML = `
        총 <strong>${quizData.length}</strong>문제 중 <strong>${score}</strong>문제를 맞혔습니다!<br>
        <span style="font-size: 24px; color: #e74c3c; font-weight: bold;">점수: ${finalScore}점</span>
    `;
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    quizBox.classList.remove("hidden");
    scoreBox.classList.add("hidden");
    loadQuestion();
}
