import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import Card from './Card';
import { Column as ColumnType } from '../types/kanban';
import { StrictModeDroppable } from './StrictModeDroppable'; // Make sure the path is correct

interface ColumnProps {
  column: ColumnType;
  index: number;
}

const Column: React.FC<ColumnProps> = ({ column, index }) => {
  return (
    <div className="w-64 bg-gray-100 p-4 rounded-md shadow-md mx-2">
      <h2 className="text-xl font-bold mb-4">{column.title}</h2>

      {/* Replace Droppable with StrictModeDroppable */}
      <StrictModeDroppable droppableId={column.id}>
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="min-h-[100px]"
          >
            {column.cards.map((card, cardIndex) => (
              <Draggable key={card.id} draggableId={card.id} index={cardIndex}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <Card content={card.content} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </StrictModeDroppable>
    </div>
  );
};

export default Column;
