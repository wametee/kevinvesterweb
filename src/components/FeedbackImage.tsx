import React from "react";

interface FeedbackImageProps {
  feedback: "correct" | "wrong" | "none" | "no-answer";
}


const FeedbackImage: React.FC<FeedbackImageProps> = ({ feedback }) => {
  return (
    <div className="mt-4 flex justify-center">
      {feedback === "correct" && <img src="/happy.png" alt="Correct!" className="w-32" />}
      {feedback === "wrong" && <img src="/sad.png" alt="Wrong!" className="w-32" />}
      {feedback === "no-answer" && <img src="/neutral.png" alt="No Answer Provided" className="w-32" />} 
    </div>
  );
};

export default FeedbackImage;
