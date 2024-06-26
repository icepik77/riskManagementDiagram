import { useState, useEffect } from 'react';
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from 'react-icons/ai';

interface DynamicInputsFormProps {
  onSubmit: (inputs: string[]) => void;
  initialInputs?: string[];
}

const DynamicInputsForm: React.FC<DynamicInputsFormProps> = ({ onSubmit, initialInputs = [''] }) => {
  const [inputs, setInputs] = useState<string[]>(initialInputs);

  useEffect(() => {
    setInputs(initialInputs);
  }, [initialInputs]);

  const addInput = () => {
    setInputs([...inputs, '']);
  };

  const removeInput = (index: number) => {
    const updatedInputs = [...inputs];
    updatedInputs.splice(index, 1);
    setInputs(updatedInputs);
  };

  const handleInputChange = (index: number, value: string) => {
    const updatedInputs = [...inputs];
    updatedInputs[index] = value;
    setInputs(updatedInputs);
  };

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
          {inputs.length > 1 && (
            <button type="button" onClick={() => removeInput(index)} className="text-red-500 focus:outline-none">
              <AiOutlineMinusCircle />
            </button>
          )}
        </div>
      ))}
      <button type="button" onClick={addInput} className="mb-2 flex items-center">
        <AiOutlinePlusCircle className="mr-2 text-green-500" />
        Добавить событие
      </button>
      <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-blue-600">
        Отправить
      </button>
    </form>
  );
};

export default DynamicInputsForm;


