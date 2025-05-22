let questions = [];
let currentQuestionIndex = 0;
let score = 0;

const questionText = document.getElementById("question");
const optionsContainer = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const resultBox = document.getElementById("result");

fetch("questions.json")
  .then(res => res.json())
  .then(data => {
    questions = data;
    showQuestion();
  });

function showQuestion() {
  clearOptions();
  document.getElementById("question-count").textContent =
  `Question ${currentQuestionIndex + 1} of ${questions.length}`;
  const q = questions[currentQuestionIndex];
  questionText.textContent = q.question;

   //INPUT YOUR CODE HERE
   //HINT: Loop through each option for the current question
  // TODO:
  q.options.forEach((option, index) => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.classList.add("option-btn");
    btn.onclick = () => checkAnswer(index);
    optionsContainer.appendChild(btn);
  });
};

function checkAnswer(selectedIndex) {
  const correct = questions[currentQuestionIndex].answer;
  if (selectedIndex === correct) {
    score++;
  }
  nextBtn.disabled = false;
  Array.from(optionsContainer.children).forEach((btn, i) => {
    btn.disabled = true;
    if (i === correct) btn.style.backgroundColor = "#a4edba";
    if (i === selectedIndex && i !== correct) btn.style.backgroundColor = "#f5a3a3";
  });
}

function clearOptions() {
  optionsContainer.innerHTML = "";
  nextBtn.disabled = true;
}
  // INPUT YOUR CODE HERE
  // HINT
  // 1. Clear the contents of the options container
  // 2. Disable the Next button so users can't skip ahead


nextBtn.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showResult();
    nextBtn.style.display = "none";
    resultBox.style.display = "block";
    questionText.style.display = "none";
    optionsContainer.style.display = "none";
    document.getElementById("question-count").style.display = "none";
    document.getElementById("result").style.display = "block";
    document.getElementById("result").innerHTML = `<h2>Your score: ${score} / ${questions.length}</h2>`;
    
}
  // INPUT YOUR CODE HERE
  // HINT
  // 1. Move to the next question by increasing the question index
  // 2. If there are questions left, show the next one
  // 3. Otherwise, call a function to show the final result
});


function showResult() {
  document.querySelector(".quiz-box").innerHTML = `<h2>Your score: ${score} / ${questions.length}</h2>`;
}
