import React from 'react';

const ConfirmationModal = ({ isOpen, onClose, onConfirm, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-6">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <p className="text-ms mb-4">{message}</p>
            <div className="flex justify-end gap-4 mt-8">
                <button
                    onClick={onClose}
                    className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
                >
                    Annuler
                </button>
                <button
                    onClick={onConfirm}
                    className="px-4 py-2 bg-[#eec825] text-white rounded-md"
                >
                    Confirmer
                </button>
            </div>
        </div>
    </div>
  );
};

export default ConfirmationModal;