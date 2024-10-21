import React from "react";

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        {children}
        <button
          onClick={onClose}
          className="mt-4 w-full bg-gray-300 text-black py-2 px-4 rounded-md hover:bg-gray-400"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
