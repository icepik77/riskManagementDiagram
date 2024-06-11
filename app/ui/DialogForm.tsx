"use client";


import React, { useState, useEffect } from 'react';

interface DialogFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (context: string) => void;
  contextProp: string;
}

const DialogForm: React.FC<DialogFormProps> = ({ isOpen, onClose, onSubmit, contextProp }) => {
  const [context, setContext] = useState(contextProp ? contextProp : '');

  useEffect(() => {
    setContext(contextProp);
  }, [contextProp]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(context);
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-gray-800 opacity-75 absolute inset-0" onClick={onClose}></div>
      <div className="bg-white p-6 rounded shadow-md z-50">
        <h2 className="text-xl mb-4">Контекст</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <textarea
              value={context}
              onChange={(e) => setContext(e.target.value)}
              placeholder="Введите контекст для точного построения диаграммы"
              className="w-full p-2 border rounded"
              rows={5}
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
            >
              Закрыть
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Сохранить
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DialogForm;
