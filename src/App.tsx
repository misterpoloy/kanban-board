import React, { useState } from "react";
import Board from "./components/Board";
import { Board as BoardType } from "./types/kanban";
import { DropResult } from "react-beautiful-dnd";

const initialBoard: BoardType = {
  columns: [
    {
      id: "column-1",
      title: "To Do",
      cards: [{ id: "card-1", content: "Task 1" }],
    },
    {
      id: "column-2",
      title: "In Progress",
      cards: [{ id: "card-2", content: "Task 2" }],
    },
    {
      id: "column-3",
      title: "Done",
      cards: [{ id: "card-3", content: "Task 3" }],
    },
  ],
};

const App: React.FC = () => {
  const [board, setBoard] = useState<BoardType>(initialBoard);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    const sourceColumn = board.columns.find(
      (col) => col.id === source.droppableId
    );
    const destinationColumn = board.columns.find(
      (col) => col.id === destination.droppableId
    );

    if (!sourceColumn || !destinationColumn) return;

    const [movedCard] = sourceColumn.cards.splice(source.index, 1);
    destinationColumn.cards.splice(destination.index, 0, movedCard);

    setBoard({ ...board });
  };

  return (
    <div className="min-h-screen bg-gray-200 p-8">
      <Board board={board} onDragEnd={onDragEnd} />
    </div>
  );
};

export default App;
