// EditTaskModal.tsx
import React, { useState } from "react";
import Modal from "./Modal";

interface EditTaskModalProps {
  taskId: string;
  initialContent: string;
  onClose: () => void;
}

const EditTaskModal: React.FC<EditTaskModalProps> = ({
  taskId,
  initialContent,
  onClose,
}) => {
  const [content, setContent] = useState(initialContent);

  const handleSave = () => {
    console.log(`Task ID: ${taskId}, New Content: ${content}`);
    onClose(); // Close the modal after saving
  };

  return (
    <Modal onClose={onClose}>
      <h2 className="text-xl font-semibold mb-4">Edit Task</h2>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full h-24 p-2 border border-gray-300 rounded-md"
      />
      <button
        onClick={handleSave}
        className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
      >
        Save
      </button>
    </Modal>
  );
};

export default EditTaskModal;
