import { useState } from 'react';

const DynamicInputsForm = ({ onSubmit }: { onSubmit: (inputs: string[]) => void }) => {
  const [inputs, setInputs] = useState<string[]>(['']); // Стейт для хранения значений инпутов

  // Функция для добавления нового инпута
  const addInput = () => {
    setInputs([...inputs, '']);
  };

  // Функция для удаления инпута по индексу
  const removeInput = (index: number) => {
    const updatedInputs = [...inputs];
    updatedInputs.splice(index, 1);
    setInputs(updatedInputs);
  };

  // Функция для обновления значения инпута
  const handleInputChange = (index: number, value: string) => {
    const updatedInputs = [...inputs];
    updatedInputs[index] = value;
    setInputs(updatedInputs);
  };

  // Функция для обработки отправки формы
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(inputs);
  };

  return (
    <form onSubmit={handleSubmit}>
      {inputs.map((input, index) => (
        <div key={index} className="flex items-center space-x-2 mb-2">
          <input
            type="text"
            value={input}
            onChange={(e) => handleInputChange(index, e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 flex-grow"
          />
          <button type="button" onClick={() => removeInput(index)} className="text-red-500 focus:outline-none">
            Удалить
          </button>
        </div>
      ))}
      <button type="button" onClick={addInput} className="mb-2">
        Добавить инпут
      </button>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Отправить
      </button>
    </form>
  );
};

export default DynamicInputsForm;
