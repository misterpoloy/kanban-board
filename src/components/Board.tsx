import React, { useEffect, useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import Column from "./Column";
import { Board as BoardType } from "../types/kanban";
import { useQuery, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";

interface BoardProps {
  onDragEnd: (result: DropResult) => void;
}

const GET_BOARDS = gql`
  query GetBoards {
    boards {
      columns {
        id
        title
        cards {
          id
          content
        }
      }
    }
  }
`;

const Board: React.FC<BoardProps> = ({ onDragEnd }) => {
  const { loading, error, data, refetch } = useQuery(GET_BOARDS);
  const [board, setBoard] = useState<BoardType | null>(null);
  const navigate = useNavigate(); // To navigate to the logout route

  useEffect(() => {
    if (data) {
      setBoard(data.boards[0]); // Use the first board from the query
    }
  }, [data]);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear the JWT token
    navigate("/auth"); // Redirect to the login page
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Menu */}
      <div className="bg-white shadow-md py-4 px-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Kanban Board</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {/* Board Content */}
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex space-x-4 p-8">
          {board?.columns.map((column, index) => (
            <Column key={column.id} column={column} index={index} />
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default Board;
