import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { gql, useMutation } from '@apollo/client';
import Card from './Card';
import { Column as ColumnType } from '../types/kanban';
import { StrictModeDroppable } from './StrictModeDroppable';
import Modal from './Modal';

// GraphQL mutation to create a new card
const CREATE_CARD_MUTATION = gql`
  mutation CreateCard($content: String!, $columnId: ID!) {
    createCard(content: $content, columnId: $columnId) {
      card {
        id
        content
      }
    }
  }
`;

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

interface ColumnProps {
  column: ColumnType;
  index: number;
}

const Column: React.FC<ColumnProps> = ({ column, index }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTask, setNewTask] = useState('');
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentCard, setCurrentCard] = useState<{ id: string; content: string } | null>(null);
  const [createCard] = useMutation(CREATE_CARD_MUTATION, {
    refetchQueries: [{ query: GET_BOARDS }],
  });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const openEditModal = (card: { id: string; content: string }) => {
    setCurrentCard(card);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setCurrentCard(null);
    setEditModalOpen(false);
  };

  const handleCreateTask = async () => {
    if (newTask.trim()) {
      try {
        await createCard({
          variables: { content: newTask, columnId: column.id },
        });
        setNewTask('');
        closeModal();
      } catch (error) {
        console.error('Error creating task:', error);
      }
    }
  };

  const handleEditTask = () => {
    if (currentCard && currentCard.content.trim()) {
      console.log(`Updated card: ${currentCard.content}`);
      closeEditModal();
    }
  };

  const handleDeleteTask = () => {
    console.log(`Deleted card with id: ${currentCard?.id}`);
    // Implement deletion logic here with a mutation if needed
    closeEditModal();
  };

  return (
    <div className="w-64 bg-gray-100 p-4 rounded-md shadow-md mx-2">
      <h2 className="text-xl font-bold mb-4">{column.title}</h2>

      <StrictModeDroppable droppableId={column.id}>
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="min-h-[100px]"
          >
            {column.cards.map((card, cardIndex) => (
              <Draggable key={card.id} draggableId={card.id} index={cardIndex}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <Card
                      id={card.id}
                      content={card.content}
                      onEdit={() => openEditModal(card)}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </StrictModeDroppable>

      <button
        onClick={openModal}
        className="mt-4 bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-blue-600"
      >
        +
      </button>

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <h3 className="text-lg font-bold mb-4">Add a New Task</h3>
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="w-full p-2 border rounded-md mb-4"
            placeholder="Enter task content"
          />
          <button
            onClick={handleCreateTask}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Add Task
          </button>
        </Modal>
      )}

      {editModalOpen && currentCard && (
        <Modal onClose={closeEditModal}>
          <h3 className="text-lg font-bold mb-4">Edit Task</h3>
          <input
            type="text"
            value={currentCard.content}
            onChange={(e) =>
              setCurrentCard((prev) => prev && { ...prev, content: e.target.value })
            }
            className="w-full p-2 border rounded-md mb-4"
            placeholder="Edit task content"
          />

          <button
            onClick={handleEditTask}
            className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
          >
            Save Changes
          </button>

          {/* Red Delete Button in the middle */}
          <button
            onClick={handleDeleteTask}
            className="mt-4 w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
          >
            Delete Task
          </button>
        </Modal>
      )}
    </div>
  );
};

export default Column;
