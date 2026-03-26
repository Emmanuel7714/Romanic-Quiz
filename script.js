// Array of questions for the Romans quiz
const quizData = [
  { question: "Q1: By what are we saved?", options: ["Faith", "Works", "Money", "Power"], answer: "Faith" },
  { question: "Q2: God's law is ___?", options: ["Selective", "Optional", "Always broken", "Irrelevant"], answer: "Selective" },
  { question: "Q3: Eternal life is ___?", options: ["Temporary", "Forever", "Partial", "Conditional"], answer: "Forever" },
  { question: "Q4: What does the law show?", options: ["Faith", "Sin", "Love", "Joy"], answer: "Sin" },
  { question: "Q5: Peace with God is ___?", options: ["Partial peace", "Total peace", "Impossible", "Conditional"], answer: "Partial peace" },
  { question: "Q6: Abraham is known for ___?", options: ["Lineage", "Wealth", "Fame", "Kingdom"], answer: "Lineage" },
  { question: "Q7: Romans gives ___?", options: ["A history of Israel", "Political advice", "Cooking recipes", "Sports tips"], answer: "A history of Israel" },
  { question: "Q8: God's kindness is ___?", options: ["Conditional", "Partial", "Abundant", "Non-existent"], answer: "Abundant" },
  { question: "Q9: Humans are ___?", options: ["Partially righteous", "Perfect", "Always sinful", "Angelic"], answer: "Partially righteous" },
  { question: "Q10: What is central to salvation?", options: ["Faith", "Money", "Works", "Knowledge"], answer: "Faith" },
  { question: "Q11: Life in Christ is ___?", options: ["Life in the Spirit", "Life of rules", "Life of sin", "Life of fear"], answer: "Life in the Spirit" },
  { question: "Q12: What must we do to obey God?", options: ["Obedience", "Ignore", "Delay", "Argue"], answer: "Obedience" }
];

// Get HTML elements
const quizContainer = document.getElementById("quiz-container");
const submitBtn = document.getElementById("submit-btn");
const resultDiv = document.getElementById("result");

// Function to display the quiz
function loadQuiz() {
  quizContainer.innerHTML = ""; // Clear previous content

  quizData.forEach((q, index) => {
    const questionEl = document.createElement("div");
    questionEl.classList.add("question");
    questionEl.innerHTML = `<p>${q.question}</p>`;

    const optionsList = document.createElement("ul");
    optionsList.classList.add("options");

    q.options.forEach(option => {
      const li = document.createElement("li");
      li.innerHTML = `<label><input type="radio" name="q${index}" value="${option}"> ${option}</label>`;
      optionsList.appendChild(li);
    });

    questionEl.appendChild(optionsList);
    quizContainer.appendChild(questionEl);
  });
}

// Function to calculate the score
function calculateScore() {
  let score = 0;
  quizData.forEach((q, index) => {
    const selected = document.querySelector(`input[name="q${index}"]:checked`);
    if (selected && selected.value === q.answer) {
      score++;
    }
  });
  resultDiv.textContent = `You scored ${score} out of ${quizData.length}!`;
}

// Load quiz on page load
loadQuiz();

// Submit button event
submitBtn.addEventListener("click", calculateScore);