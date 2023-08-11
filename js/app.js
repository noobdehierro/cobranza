function showQuestion(questionId) {
  // Oculta todas las preguntas
  const questions = document.querySelectorAll(".question");
  questions.forEach((question) => {
    question.style.display = "none";
  });

  // Muestra la pregunta deseada
  const questionToShow = document.getElementById(questionId);
  if (questionToShow) {
    questionToShow.style.display = "block";
  }
}

function showResult(resultText) {
  const resultDiv = document.getElementById("result");
  const resultTextElement = document.getElementById("resultText");
  resultTextElement.innerText = resultText;
  resultDiv.style.display = "block";
}
