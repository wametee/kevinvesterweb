import React from "react";
import { Question } from "../type";

interface QuestionProps {
  question: Question;
  selectedAnswer: string | null;
  handleSelectAnswer: (answer: string) => void;
}

const QuestionComponent: React.FC<QuestionProps> = ({ question, selectedAnswer, handleSelectAnswer }) => {
  return (
    <div className="text-center">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800">{question.question}</h2>
      <div className="mt-4 space-y-3">
        {question.choices.map((choice, index) => (
          <button
            key={index}
            onClick={() => handleSelectAnswer(choice)}
            className={`w-full py-2 sm:py-3 px-4 rounded-lg border transition font-medium text-gray-700 
              ${selectedAnswer === choice ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"}`}>
            {choice}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionComponent;
