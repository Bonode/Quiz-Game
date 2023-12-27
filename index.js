const questions = [
  // Multiple Choice Questions
  {
    question: "What is the largest species of shark?",
    options: [
      "Great White Shark",
      "Hammerhead Shark",
      "Whale Shark",
      "Tiger Shark",
    ],
    correctAnswer: "Whale Shark",
    type: "multipleChoice",
  },
  {
    question:
      "Which bird is known for its colorful plumage and ability to mimic sounds?",
    options: ["Penguin", "Parrot", "Eagle", "Ostrich"],
    correctAnswer: "Parrot",
    type: "multipleChoice",
  },
  {
    question: "What is the largest land animal in the world?",
    options: ["Elephant", "Giraffe", "Hippopotamus", "Rhinoceros"],
    correctAnswer: "Elephant",
    type: "multipleChoice",
  },
  {
    question: "Which of the following animals is a marsupial?",
    options: ["Kangaroo", "Lion", "Zebra", "Gorilla"],
    correctAnswer: "Kangaroo",
    type: "multipleChoice",
  },
  {
    question: "What is the fastest land animal?",
    options: ["Lion", "Leopard", "Gazelle", "Cheetah"],
    correctAnswer: "Cheetah",
    type: "multipleChoice",
  },

  // True or False Questions
  {
    question: "Penguins can fly.",
    correctAnswer: false,
    type: "trueFalse",
  },
  {
    question: "Alligators are found in Africa.",
    correctAnswer: false,
    type: "trueFalse",
  },
  {
    question: "Bats are mammals.",
    correctAnswer: true,
    type: "trueFalse",
  },
  {
    question: "Koalas are bears.",
    correctAnswer: false,
    type: "trueFalse",
  },
  {
    question: "Spiders are insects.",
    correctAnswer: false,
    type: "trueFalse",
  },

  // Identification Questions
  {
    question:
      "Identify the animal: A long-necked, herbivorous mammal native to Africa.",
    correctAnswer: "Giraffe",
    type: "identification",
  },
  {
    question:
      "Identify the animal: A large, flightless bird native to Australia.",
    correctAnswer: "Emu",
    type: "identification",
  },
  {
    question:
      "Identify the animal: A nocturnal, carnivorous marsupial native to Australia.",
    correctAnswer: "Tasmanian Devil",
    type: "identification",
  },
  {
    question:
      "Identify the animal: A small, striped, carnivorous mammal native to North America.",
    correctAnswer: "Raccoon",
    type: "identification",
  },
  {
    question: "Identify the animal: A large, horned mammal native to Africa.",
    correctAnswer: "Rhino",
    type: "identification",
  },
];

let currentQuestion = 0;
let score = 0;
let timer;

function startTimer() {
  let timeLeft = 30;
  timer = setInterval(() => {
    document.getElementById("timer").textContent = timeLeft;
    if (timeLeft === 0) {
      clearInterval(timer);
      nextQuestion();
    }
    timeLeft--;
  }, 1000);
}

function displayQuestion() {
  const questionElement = document.getElementById("question");
  const optionsElement = document.getElementById("options");
  const questionData = questions[currentQuestion];

  questionElement.textContent = questionData.question;
  optionsElement.innerHTML = "";

  if (questionData.type === "multipleChoice") {
    questionData.options.forEach((option) => {
      const button = document.createElement("button");
      button.textContent = option;
      button.addEventListener("click", () => checkAnswer(option));
      optionsElement.appendChild(button);
    });
  } else if (questionData.type === "trueFalse") {
    const trueButton = document.createElement("button");
    trueButton.textContent = "True";
    trueButton.addEventListener("click", () => checkAnswer(true));
    optionsElement.appendChild(trueButton);

    const falseButton = document.createElement("button");
    falseButton.textContent = "False";
    falseButton.addEventListener("click", () => checkAnswer(false));
    optionsElement.appendChild(falseButton);
  } else if (questionData.type === "identification") {
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Type your answer...";
    optionsElement.appendChild(input);

    const submitButton = document.createElement("button");
    submitButton.textContent = "Submit";
    submitButton.addEventListener("click", () => {
      const userAnswer = input.value.trim();
      checkAnswer(userAnswer);
    });
    optionsElement.appendChild(submitButton);
  }
}

function checkAnswer(selectedOption) {
  clearInterval(timer);
  const questionData = questions[currentQuestion];
  if (selectedOption === questionData.correctAnswer) {
    score++;
  }
  document.getElementById("next-btn").style.display = "block";
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    startTimer();
    displayQuestion();
    document.getElementById("next-btn").style.display = "none";
  } else {
    endQuiz();
  }
}

function endQuiz() {
  document.getElementById(
    "question"
  ).textContent = `You've completed the quiz! Your score is ${score}/${questions.length}.`;
  document.getElementById("options").innerHTML = "";
  document.getElementById("timer").textContent = "";
  document.getElementById("next-btn").style.display = "none";
}

startTimer();
displayQuestion();
