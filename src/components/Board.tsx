import React from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import Column from "./Column";
import { Board as BoardType } from "../types/kanban";

interface BoardProps {
  board: BoardType;
  onDragEnd: (result: DropResult) => void;
}

const Board: React.FC<BoardProps> = ({ board, onDragEnd }) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex space-x-4">
        {board.columns.map((column, index) => (
          <Column key={column.id} column={column} index={index} />
        ))}
      </div>
    </DragDropContext>
  );
};

export default Board;
