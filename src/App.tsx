import React, { useEffect, useState } from "react";
import axios from "axios";
import QuestionComponent from "./components/Question";
import FeedbackImage from "./components/FeedbackImage";
import { Question } from "./type";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

const App: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | "none" | "no-answer">("none");
  const [score, setScore] = useState(0);
  const [error, setError] = useState<string | null>(null); // Error state

  useEffect(() => {
    // Fetch questions from the backend
    axios
      .get("https://kevodb.onrender.com/questions") // Change to actual endpoint
      .then((response) => {
        setQuestions(response.data);
      })
      .catch((error) => {
        console.error("Error fetching questions:", error);
        setError("Failed to load questions. Please try again later.");
      });
  }, []);

  const handleSelectAnswer = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = () => {
    if (!selectedAnswer) {
      setFeedback("no-answer");
      return;
    }

    const isCorrect = selectedAnswer === questions[currentQuestionIndex]?.correctAnswer;

    if (isCorrect) {
      setFeedback("correct");
      setScore((prevScore) => prevScore + 3);
    } else {
      setFeedback("wrong");
    }

    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
        setFeedback("none");
      }
    }, 1000);
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedAnswer(null);
      setFeedback("none");
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-6 bg-gray-900 text-white bg-cover bg-center"
      style={{ backgroundImage: "url('/src/assets/kelvoback.jpg')" }}
    >
      {/* Marks Display */}
      <div className="flex items-center justify-center mb-4">
        <span className="bg-green-500 text-white font-bold text-lg px-6 py-3 rounded-full shadow-md">
          Score: {score}
        </span>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-500 text-white p-4 rounded-md mb-4">
          <p>{error}</p>
        </div>
      )}

      <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl bg-white shadow-lg rounded-lg p-6 text-gray-900">
        {questions.length > 0 ? (
          <>
            <QuestionComponent
              question={questions[currentQuestionIndex]}
              selectedAnswer={selectedAnswer}
              handleSelectAnswer={handleSelectAnswer}
            />
            <FeedbackImage feedback={feedback} />
          </>
        ) : (
          !error && <p className="text-gray-600">Loading questions...</p> // Display loading message if no questions and no error
        )}

        <div className="flex justify-between items-center mt-6">
          <button
            onClick={handlePrevQuestion}
            disabled={currentQuestionIndex === 0}
            className={`p-2 rounded-full transition ${
              currentQuestionIndex === 0
                ? "text-gray-400 cursor-not-allowed"
                : "text-blue-500 hover:bg-gray-200"
            }`}
          >
            <ChevronLeftIcon className="w-6 h-6 sm:w-8 sm:h-8" />
          </button>

          <button
            onClick={handleNextQuestion}
            className="bg-green-500 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg text-sm sm:text-lg font-semibold hover:bg-green-600 transition"
          >
            Answer
          </button>

          <button
            disabled={currentQuestionIndex === questions.length - 1}
            onClick={handleNextQuestion}
            className={`p-2 rounded-full transition ${
              currentQuestionIndex === questions.length - 1
                ? "text-gray-400 cursor-not-allowed"
                : "text-blue-500 hover:bg-gray-200"
            }`}
          >
            <ChevronRightIcon className="w-6 h-6 sm:w-8 sm:h-8" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
