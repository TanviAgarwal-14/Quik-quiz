let questions = [
    {
    question: "What tag is used to define a hyperlink in HTML?",
    choice1: '<link>',
    choice2: '<a>',
    choice3: '<url>',
    choice4: '<hyperlink>',
    answer: 2,
},
{
    question: "Which property is used to change the text color of an element in CSS?",
    choice1: "background-color",
    choice2: "text-color",
    choice3: "color",
    choice4: "font-color",
    answer: 3,
},
{
    question: "What keyword is used to declare a variable in JavaScript?",
    choice1: "var",
    choice2: "let",
    choice3: "const",
    choice4: "variable",
    answer: 1,
},
];

let currentQuestionIndex = 0;
let score = 0;
let availableQuestions = [...questions];

document.addEventListener("DOMContentLoaded", () => {
    loadNewQuestion();
    updateHUD();

    // Add event listeners to options
    options.forEach(option => {
        option.addEventListener("click", () => {
            const selectedOption = option.dataset.number;
            if (selectedOption == questions[currentQuestionIndex - 1].answer) {
                // Increase score and apply correct class
                score++;
                option.classList.add("correct");
            } else {
                // Apply incorrect class
                option.classList.add("incorrect");
            }
            // Update score text
            scoreText.textContent = score;

            // Disable further clicking on options
            options.forEach(option => {
                option.style.pointerEvents = "none";
            });

            // Move to the next question after a brief delay
            setTimeout(() => {
                loadNewQuestion();
                // Reset option colors and enable clicking on options
                options.forEach(option => {
                    option.classList.remove("correct", "incorrect");
                    option.style.pointerEvents = "auto";
                });
            }, 1000); // Wait 1 second before loading the next question
        });
    });
});


const questionText = document.querySelector(".container h2");
const options = Array.from(document.getElementsByClassName("option"));
const questionNumberText = document.querySelector(".question-number");
const scoreText = document.querySelector(".score-number");
const progressBar = document.getElementById("progress-bar");
const totalQuestions = questions.length;

const loadNewQuestion = () => {
    if (availableQuestions.length === 0 || currentQuestionIndex >= totalQuestions) {
        localStorage.setItem("mostRecentScore", score);
        window.location.href = "end.html"; // Correct navigation to the end page
        return; // Stop further execution of the function
    }

    currentQuestionIndex++;
    questionNumberText.innerText = `${currentQuestionIndex}/${totalQuestions}`;
    updateProgressBar();

    const currentQuestion = availableQuestions.pop();
    questionText.innerText = currentQuestion.question;

    options.forEach((option, index) => {
        const optionNumber = index + 1;
        option.innerText = currentQuestion[`choice${optionNumber}`];
        option.dataset["number"] = optionNumber;
        option.classList.remove("correct", "incorrect"); // Reset color before loading new question
    });
};
const updateProgressBar = () => {
const progressPercentage = (currentQuestionIndex / totalQuestions) * 100;
progressBar.style.width = `${progressPercentage}%`;
};

options.forEach((option) => {
option.addEventListener("click", (e) => {
const selectedOption = e.target;
const selectedAnswer = selectedOption.dataset["number"];

if (selectedAnswer == currentQuestion.answer) {
    score++;
    selectedOption.classList.add("correct");
} else {
    selectedOption.classList.add("incorrect");
}

scoreText.innerText = score;

setTimeout(() => {
    selectedOption.classList.remove("correct", "incorrect");
    loadNewQuestion();
}, 1000); // wait 1 second before loading the next question
});
});

const updateHUD = () => {
const scoreElement = document.querySelector(".score-number");
scoreElement.textContent = score;
};