import React, { useEffect, useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import Column from "./Column";
import { Board as BoardType } from "../types/kanban";
import { useQuery, useMutation, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";

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

const MOVE_CARD = gql`
  mutation MoveCard($cardId: ID!, $newColumnId: ID!) {
    moveCard(cardId: $cardId, newColumnId: $newColumnId) {
      card {
        id
        content
        column {
          id
        }
      }
    }
  }
`;

const Board: React.FC = () => {
  const { loading, error, data, refetch } = useQuery(GET_BOARDS);
  const [moveCard] = useMutation(MOVE_CARD);
  const [board, setBoard] = useState<BoardType | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      setBoard(data.boards[0]); // Use the first board from the query
    }
  }, [data]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/auth");
  };

  const onDragEnd = async (result: DropResult) => {
    const { source, destination, draggableId } = result;

    // If no destination, exit early
    if (!destination) return;

    // If the card is dropped in the same column and position, exit early
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    try {
      // Trigger the moveCard mutation
      await moveCard({
        variables: {
          cardId: draggableId,
          newColumnId: destination.droppableId,
        },
      });

      // Refetch the board data to update the UI
      refetch();
    } catch (err) {
      console.error("Error moving card:", err);
    }
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
