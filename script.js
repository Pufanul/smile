const questions = [
    {
        question: "What is Fred Again's real name?",
        options: ["Fred", "Fred Gibson", "Again Fred"],
        answer: 1
    },
    {
        question: "Which famous artist did Fred Again work with?",
        options: ["Ed Sheeran", "Coldplay", "Beyoncé"],
        answer: 0
    },
    {
        question: "What genre is Fred Again known for?",
        options: ["Hip Hop", "Electronic", "Rock"],
        answer: 1
    },
    {
        question: "What is Fred Again's debut album called?",
        options: ["Actual Life", "The Last Goodbye", "The Color of You"],
        answer: 0
    }
];

let currentQuestionIndex = 0;
let score = 0;

const introductionElement = document.getElementById('introduction');
const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const resultElement = document.getElementById('result');
const congratulationsElement = document.getElementById('congratulations');
const fredImage = document.getElementById('fredImage');
const messageElement = document.getElementById('message');
const startButton = document.getElementById('start-button');

startButton.onclick = startQuiz; // Start quiz on button click

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    introductionElement.style.display = 'none'; // Hide introduction
    questionElement.style.display = 'block'; // Show question
    optionsElement.style.display = 'block'; // Show options
    resultElement.style.display = 'none';
    congratulationsElement.style.display = 'none';
    showQuestion();
}

function showQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;
    optionsElement.innerHTML = '';
    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.innerText = option;
        button.onclick = () => selectOption(index);
        optionsElement.appendChild(button);
    });
}

function selectOption(index) {
    const currentQuestion = questions[currentQuestionIndex];
    if (index === currentQuestion.answer) {
        score++;
        setTimeout(() => {
            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                showQuestion();
            } else {
                showResult();
            }
        }, 500); // Automatically advance after half a second
    } else {
        const incorrectButtons = optionsElement.getElementsByTagName('button');
        for (let button of incorrectButtons) {
            button.classList.add('incorrect'); // Add incorrect class for shaking effect
        }
        setTimeout(() => {
            for (let button of incorrectButtons) {
                button.classList.remove('incorrect'); // Remove shake effect
            }
        }, 500);
    }
}

function showResult() {
    questionElement.style.display = 'none';
    optionsElement.style.display = 'none';
    resultElement.style.display = 'block';

    if (score === questions.length) {
        resultElement.innerText = 'Good job, Andutule! You are a true fan!';
        fredImage.style.display = 'block';
        messageElement.style.display = 'block'; // Show the custom message
    } else {
        resultElement.innerText = `You got ${score} out of ${questions.length} correct.`;
        resultElement.innerText += "\nBetter luck next time!";
    }

    congratulationsElement.style.display = 'block';
}
