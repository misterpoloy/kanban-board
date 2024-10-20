import React from "react";

interface CardProps {
  content: string;
}

const Card: React.FC<CardProps> = ({ content }) => {
  return (
    <div className="p-4 bg-white shadow-md rounded-md mb-2">
      {content}
    </div>
  );
};

export default Card;