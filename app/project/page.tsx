// pages/index.tsx
'use client'

import React, { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import Popup from '../ui/Popup';
import DynamicInputsForm from '@/app/ui/InputsList';
import EventTreeElement from '@/app/lib/types/EventTree';
import API_KEY from '@/config/config';
import Tree from '../ui/Tree';
import DialogForm from '../ui/DialogForm';

interface ProjectData {
  id: number;
  name: string;
  context: string;
  eventTreeElements: EventTreeElement[];
}

interface HomeProps {
  selectedProject: ProjectData;
  onUpdateProjectContext: (projectId: number, newContext: string) => void;
  onUpdateProjectTreeEvents: (projectId: number, newTreeEvents: EventTreeElement[]) => void;
}

const Home: React.FC<HomeProps> = ({ selectedProject, onUpdateProjectContext, onUpdateProjectTreeEvents }) => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [response, setResponse] = useState<string>('');
  const [visibleInputs, setVisibleInputs] = useState(true);
  const [inputs, setInputs] = useState<string[]>(['']);
  const [eventTreeElements, setEventTreeElements] = useState<EventTreeElement[]>(selectedProject.eventTreeElements);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [context, setContext] = useState(selectedProject.context);

  useEffect(() => {
    setContext(selectedProject.context);
    setEventTreeElements(selectedProject.eventTreeElements);
    setInputs(['']); // Сброс состояния формы при изменении выбранного проекта
  }, [selectedProject]);

  const handleSubmit = (inputs: string[]) => {
    setHandleRequest(inputs);
    setInputs(inputs);
    console.log('Отправлены следующие инпуты:', inputs);
  };

  const setHandleRequest = (inputs: string[]) => {
    const fetchData = async () => {
      try {
        const apiKey = API_KEY;
        const requestBody = {
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'user',
              content: `
              Необходимо провести Event tree analysis. Вот контекст задачи: ${context}
              Вот начальные события: ${inputs} Используй эти начальные рисковые события, построй два варианта событий от начального - положительный и отрицательный. События должны состоять из двух слов. Продолжай вести дерево до полного отказа системы или полной нормализации состояния.  Ответ дай в формате json EventTreeElement[]. 
              interface EventTreeElement {
                title: string;
                children?: EventTreeElement[];
              }
              `,
            },
          ],
        };

        const response: AxiosResponse<any> = await axios.post(
          'https://api.openai.com/v1/chat/completions',
          requestBody,
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${apiKey}`,
            },
          }
        );

        const data: EventTreeElement[] = JSON.parse(response.data.choices[0].message.content);

        setEventTreeElements(data);
        onUpdateProjectTreeEvents(selectedProject.id, data); // Обновляем дерево после получения данных

      } catch (error) {
        console.error('Error fetching response from API:', error);
      }
    };

    fetchData();
  };

  const handleClosePopup = () => {
    setPopupOpen(false);
  };

  const handleConfirmPopup = () => {
    setPopupOpen(false);
    setVisibleInputs(true);
  };

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleSubmitContext = (newContext: string) => {
    onUpdateProjectContext(selectedProject.id, newContext);
    setContext(newContext);
  };

  return (
    <main className="flex lex-col p-6 relative">
      {isPopupOpen && (
        <Popup
          title="Создать начальные события вручную?"
          onClose={handleClosePopup}
          onConfirm={handleConfirmPopup}
          isOpen={isPopupOpen}
        />
      )}
      <div>
        <h1 className="text-2xl font-semibold mb-4">Начальные события</h1>
        {visibleInputs && <DynamicInputsForm onSubmit={handleSubmit} initialInputs={inputs} />}
        {response && <div>{response}</div>}
      </div>
      {eventTreeElements && (
        <div>
          
        </div>
      )}
      <div className='absolute bottom-[10%] right-[3%]'>
        <button onClick={handleOpenDialog} type="submit" className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-blue-600">
          Контекст
        </button>
      </div>
      <DialogForm isOpen={isDialogOpen} onClose={handleCloseDialog} onSubmit={handleSubmitContext} contextProp={context} />
    </main>
  );
};

export default Home;

