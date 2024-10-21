import React from "react";
import { FaPencilAlt } from "react-icons/fa"; // Install react-icons if needed

interface CardProps {
  id: string;
  content: string;
  onEdit?: (id: string) => void; // Handler to edit the specific card by id
}

const Card: React.FC<CardProps> = ({ id, content, onEdit }) => {
  return (
    <div className="relative p-4 bg-white shadow-md rounded-md mb-2 group">
      <p>{content}</p>

      {/* Pencil Icon, visible on hover */}
      <button
        onClick={() => onEdit && onEdit(id)} // Call onEdit with the card id
        className="absolute top-2 right-2 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:text-gray-600"
      >
        <FaPencilAlt />
      </button>
    </div>
  );
};

export default Card;
