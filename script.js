document.addEventListener("DOMContentLoaded", function () {
    // Define the questions and options for the quiz
    const questions = [
        {
            question: "How do you feel most loved?",
            options: [
                { text: "Hearing kind words", value: "words" },
                { text: "Receiving help with tasks", value: "acts" },
                { text: "Receiving gifts", value: "gifts" },
                { text: "Spending quality time", value: "time" },
                { text: "Physical affection", value: "touch" }
            ]
        },
        {
            question: "What makes your relationships stronger?",
            options: [
                { text: "Encouraging words", value: "words" },
                { text: "Acts of service", value: "acts" },
                { text: "Thoughtful gifts", value: "gifts" },
                { text: "Meaningful time together", value: "time" },
                { text: "Hugs and kisses", value: "touch" }
            ]
        }
    ];

    let scores = { words: 0, acts: 0, gifts: 0, time: 0, touch: 0 };
    let currentQuestionIndex = 0;

    const questionDisplay = document.getElementById("question-display");
    const optionsContainer = document.getElementById("options-container");
    const startQuizBtn = document.getElementById("start-quiz");

    // Function to create and display options dynamically
    function createOptionButton(option) {
        const button = document.createElement("button");
        button.textContent = option.text;
        button.classList.add("option");
        button.dataset.value = option.value;
        button.addEventListener("click", () => handleOptionSelect(option.value));
        return button;
    }

    // Handle the selection of an answer
    function handleOptionSelect(value) {
        scores[value]++;
        currentQuestionIndex++;
        showQuestion();
    }

    // Display the current question and its options
    function showQuestion() {
        if (currentQuestionIndex < questions.length) {
            const currentQuestion = questions[currentQuestionIndex];
            questionDisplay.textContent = currentQuestion.question;
            optionsContainer.innerHTML = ""; // Clear previous options

            // Create and append each option dynamically
            currentQuestion.options.forEach(option => {
                const button = createOptionButton(option);
                optionsContainer.appendChild(button);
            });
        } else {
            displayResults();
        }
    }

    // Display the quiz results in a graphical format
    function displayResults() {
        questionDisplay.textContent = "Your Love Language Results!";
        optionsContainer.innerHTML = ""; // Clear options container

        Object.keys(scores).forEach(language => {
            const barContainer = document.querySelector(`.bar-container[data-language="${language}"]`);
            if (barContainer) {
                const bar = barContainer.querySelector(".bar");
                const height = scores[language] * 50; // Scale the height of the bar
                bar.style.height = `${height}px`;
            }
        });
    }

    // Initialize the quiz when the start button is clicked
    startQuizBtn.addEventListener("click", () => {
        currentQuestionIndex = 0;
        scores = { words: 0, acts: 0, gifts: 0, time: 0, touch: 0 }; // Reset scores
        showQuestion();
    });

    // Define daily challenges
    const dailyChallenges = [
        "Compliment someone sincerely today!",
        "Take time to listen deeply to someone you care about.",
        "Offer to help someone with a task they are struggling with.",
        "Plan a surprise, no matter how small, for someone special.",
        "Give someone a hug today, even if it's just a virtual one."
    ];

    const challengeText = document.getElementById("challenge-text");
    const newChallengeBtn = document.getElementById("new-challenge");

    // Function to get a random challenge from the array
    function getRandomChallenge() {
        const randomIndex = Math.floor(Math.random() * dailyChallenges.length);
        return dailyChallenges[randomIndex];
    }

    // Display a new challenge when the button is clicked
    newChallengeBtn.addEventListener("click", () => {
        challengeText.textContent = getRandomChallenge();
    });

    // Select love language based on card click
    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        card.addEventListener("click", () => {
            const selectedLanguage = card.dataset.language;
            scores[selectedLanguage]++;
            alert(`You selected ${card.textContent}. Your ${selectedLanguage} score is now ${scores[selectedLanguage]}.`);
        });
    });
});