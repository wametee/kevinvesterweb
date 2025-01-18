import React from "react";

interface FeedbackImageProps {
  feedback: "correct" | "wrong" | "none";
}

const FeedbackImage: React.FC<FeedbackImageProps> = ({ feedback }) => {
  return (
    <div className="mt-4">
      {feedback === "correct" && <img src="/happy.png" alt="Correct!" className="w-32 mx-auto" />}
      {feedback === "wrong" && <img src="/sad.png" alt="Wrong!" className="w-32 mx-auto" />}
    </div>
  );
};

export default FeedbackImage;
