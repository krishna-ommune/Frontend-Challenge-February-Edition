document.addEventListener("DOMContentLoaded", function () {
    let currentQuestion = 0;
    let quizResults = { words: 0, acts: 0, gifts: 0, time: 0, touch: 0 };

    const questions = [
        "When feeling down, what cheers you up the most?",
        "How do you prefer to show affection to your partner?",
        "What makes you feel most appreciated in a relationship?",
        "On your birthday, what would you most like your partner to do?",
        "When you've had a tough day, what do you crave from your partner?",
        "What makes you feel closest to someone?",
        "How do you like to celebrate an achievement?",
        "What do you miss most when you're apart from your partner?",
        "What would make a date night special for you?",
        "How do you feel most loved by a friend?"
    ];

    const answerOptions = [
        ["Hearing words of encouragement", "Having someone do a task for you", "Receiving a thoughtful gift", "Spending quality time together", "Getting a comforting hug"],
        ["Saying 'I love you' and giving compliments", "Doing helpful tasks or chores", "Giving meaningful gifts", "Planning special dates", "Showing physical affection"],
        ["Verbal praise and appreciation", "When they help with your responsibilities", "When they surprise you with gifts", "When they give you undivided attention", "When they show physical affection"],
        ["Write you a heartfelt card", "Take care of all your chores", "Give you a special present", "Spend the whole day with you", "Give you lots of hugs and kisses"],
        ["Words of reassurance", "Help with something practical", "A small 'pick-me-up' gift", "Undistracted listening", "A long, comforting hug"],
        ["Deep and meaningful conversations", "Doing something helpful together", "Exchanging gifts", "Spending one-on-one time", "Physical closeness"],
        ["A heartfelt compliment", "A kind gesture like cooking for you", "A surprise present", "A celebration together", "A big hug and high-five"],
        ["Hearing their voice and kind words", "Missing their little acts of care", "Not receiving their surprise gifts", "Not spending time together", "Not getting their hugs and kisses"],
        ["A deep conversation over dinner", "A night where everything is taken care of", "A surprise present at the end", "A long evening spent together", "Lots of hand-holding and cuddles"],
        ["A sincere and heartfelt message", "A favor when needed", "A thoughtful gift", "A planned get-together", "A hug or physical support"]
    ];

    const languageCards = document.querySelectorAll(".card");
    const heroSection = document.getElementById("hero");

    languageCards.forEach(card => {
        const language = card.dataset.language;
        const example = document.createElement("div");
        example.className = "card-example";
        example.textContent = {
            words: "Saying 'I love you' multiple times a day and offering sincere compliments.",
            acts: "Doing chores without being asked or preparing a surprise meal for your partner.",
            gifts: "Giving thoughtful, personalized presents, even if they're small.",
            time: "Having a device-free date night or taking a walk together every evening.",
            touch: "Holding hands while walking or giving a comforting hug after a long day."
        }[language];
        card.appendChild(example);

        card.addEventListener("click", (e) => {
            e.stopPropagation();
            const wasActive = card.classList.contains("active");

            document.querySelectorAll(".card").forEach(c => c.classList.remove("active"));
            heroSection.classList.remove("card-expanded");

            if (!wasActive) {
                card.classList.add("active");
                heroSection.classList.add("card-expanded");
            }
        });
    });

    document.addEventListener("click", () => {
        document.querySelectorAll(".card").forEach(c => c.classList.remove("active"));
        heroSection.classList.remove("card-expanded");
    });

    // QUIZ LOGIC
    let scores = { words: 0, acts: 0, gifts: 0, time: 0, touch: 0 };
    let currentQuestionIndex = 0;

    const questionDisplay = document.getElementById("question-display");
    const optionsContainer = document.getElementById("options-container");
    const startQuizBtn = document.getElementById("start-quiz");

    function createOptionButton(option) {
        const button = document.createElement("button");
        button.textContent = option.text;
        button.classList.add("option");
        button.dataset.value = option.value;
        button.addEventListener("click", () => handleOptionSelect(option.value));
        return button;
    }

    function handleOptionSelect(value) {
        scores[value]++;
        currentQuestionIndex++;
        showQuestion();
    }

    function showQuestion() {
        if (currentQuestionIndex < questions.length) {
            questionDisplay.textContent = questions[currentQuestionIndex];
            optionsContainer.innerHTML = "";
            answerOptions[currentQuestionIndex].forEach((option, index) => {
                const value = Object.keys(scores)[index];
                const button = createOptionButton({ text: option, value: value });
                optionsContainer.appendChild(button);
            });
        } else {
            displayResults();
        }
    }

    function displayResults() {
        questionDisplay.textContent = "Your Love Language Results!";
        optionsContainer.innerHTML = "";

        Object.keys(scores).forEach(language => {
            const barContainer = document.querySelector(`.bar-container[data-language="${language}"]`);
            if (barContainer) {
                const bar = barContainer.querySelector(".bar");
                const height = scores[language] * 50;
                bar.style.height = `${height}px`;
            }
        });
    }

    startQuizBtn.addEventListener("click", () => {
        currentQuestionIndex = 0;
        scores = { words: 0, acts: 0, gifts: 0, time: 0, touch: 0 };
        showQuestion();
    });

    // DAILY CHALLENGES
    const dailyChallenges = [
        "Compliment someone sincerely today!",
        "Take time to listen deeply to someone you care about.",
        "Offer to help someone with a task they are struggling with.",
        "Plan a surprise, no matter how small, for someone special.",
        "Give someone a hug today, even if it's just a virtual one."
    ];

    const challengeText = document.getElementById("challenge-text");
    const newChallengeBtn = document.getElementById("new-challenge");

    function getRandomChallenge() {
        return dailyChallenges[Math.floor(Math.random() * dailyChallenges.length)];
    }

    newChallengeBtn.addEventListener("click", () => {
        challengeText.textContent = getRandomChallenge();
    });

    // LOVE LANGUAGE CARD SELECTION
    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        card.addEventListener("click", () => {
            const selectedLanguage = card.dataset.language;
            scores[selectedLanguage]++;
            alert(`You selected ${card.textContent}. Your ${selectedLanguage} score is now ${scores[selectedLanguage]}.`);
        });
    });


    function showQuestion() {
        if (currentQuestionIndex < questions.length) {
            questionDisplay.textContent = questions[currentQuestionIndex];
            optionsContainer.innerHTML = "";

            answerOptions[currentQuestionIndex].forEach((option, index) => {
                const value = Object.keys(scores)[index];
                const button = createOptionButton({ text: option, value: value });
                optionsContainer.appendChild(button);
            });

            // Update Progress Bar
            const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
            document.getElementById("progress-bar").style.width = `${progress}%`;

        } else {
            displayResults();
        }
    }
    // Stories data
    const stories = {
        words: {
            title: "The Power of Words",
            preview: "A story about the impact of kind words...",
            full: `When Clara lost her job, Mark began leaving daily love notes in her lunchbox. "Your laugh lights up rooms," one read. "Best decision I ever made was choosing you," said another. Over months, these paper hugs rebuilt her confidence.`
        },
        acts: {
            title: "Small Acts, Big Love",
            preview: "When actions speak louder...",
            full: `Emma never noticed how Ethan quietly supported her. He'd wake early to defrost her car, memorize her coffee order, and secretly feed her parking meter.`
        },
        gifts: {
            title: "Meaningful Gestures",
            preview: "The art of thoughtful giving...",
            full: `For their first anniversary, broke student Jake gifted Mia a mason jar filled with 365 folded stars.`
        },
        time: {
            title: "Stolen Moments",
            preview: "Moments that matter most...",
            full: `For their 10th anniversary, Nora planned a surprise - 24 hours unplugged. No phones, no TV, just them.`
        },
        touch: {
            title: "Silent Symphony",
            preview: "Connection beyond words...",
            full: `After losing his hearing in an accident, David learned love's new vocabulary.`
        }
    };

    let currentStoryIndex = 0;
    const storyKeys = Object.keys(stories);

    function createStoryCard(index) {
        const storyContainer = document.getElementById("story-carousel");
        storyContainer.innerHTML = ""; // Clear previous story

        const category = storyKeys[index];
        const story = stories[category];

        const card = document.createElement("div");
        card.classList.add("story-card");
        card.dataset.category = category;

        card.innerHTML = `
            <h3>${story.title}</h3>
            <p class="preview">${story.preview}</p>
            <span class="expand-btn">+</span>
            <div class="full-story" style="display: none;">${story.full}</div>
        `;

        // Add click event for expanding story
        card.querySelector(".expand-btn").addEventListener("click", function () {
            const fullStory = card.querySelector(".full-story");
            fullStory.style.display = fullStory.style.display === "block" ? "none" : "block";
            this.textContent = this.textContent === "+" ? "-" : "+";
        });

        storyContainer.appendChild(card);
    }

    function updateStory(direction) {
        if (direction === "next" && currentStoryIndex < storyKeys.length - 1) {
            currentStoryIndex++;
        } else if (direction === "prev" && currentStoryIndex > 0) {
            currentStoryIndex--;
        }
        createStoryCard(currentStoryIndex);
    }

    // Event listeners for navigation buttons
    document.getElementById("prev-story").addEventListener("click", () => updateStory("prev"));
    document.getElementById("next-story").addEventListener("click", () => updateStory("next"));

    // Load the first story on page load
    createStoryCard(currentStoryIndex);



    // Initialize Map
    var map = L.map('map').setView([20, 0], 2); // Centered on the world

    // Add Tile Layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Region Data
    const regions = {
        asia: { lat: 34.0479, lng: 100.6197, info: "Asia: Love is often shown through deep familial bonds and traditions." },
        europe: { lat: 54.5260, lng: 15.2551, info: "Europe: Romance is often expressed through art, poetry, and public gestures." },
        americas: { lat: 37.0902, lng: -95.7129, info: "Americas: Love takes many forms, from passionate Latin dances to simple daily acts of kindness." },
        africa: { lat: 1.2921, lng: 36.8219, info: "Africa: Love is expressed through community, storytelling, and dance." }
    };

    // Add Region Markers
    Object.keys(regions).forEach(region => {
        const { lat, lng, info } = regions[region];
        L.marker([lat, lng]).addTo(map)
            .bindPopup(`<strong>${region.toUpperCase()}</strong><br>${info}`)
            .on('click', function () {
                document.getElementById("region-info").innerText = info;
            });
    });
    
});

