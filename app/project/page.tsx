// pages/index.tsx
'use client'
import React, { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import Popup from '../../components/Popup';
import DynamicInputsForm from '@/components/InputsList';

const Home: React.FC = () => {
  const [isPopupOpen, setPopupOpen] = useState(true);
  const [response, setResponse] = useState<string>('');
  const [visibleInputs, setVisibleInputs] = useState(false);
  const [inputs, setInputs] = useState<string[]>([""]);

  const setRequestDafault = () => {
    const fetchData = async () => {
      try {
        const apiKey = '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';
        const requestBody = {
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'user',
              content: `Представь, что ты проектировщик атомной электростанции. Назови 6 начальных рисковых событий, а также систему, которая решит это рисковое событие. А также добавь исход положительный и отрицательный от применения этой функции. Ответ дай в формате json. [
                {
                      content:"Здесь инфо о начальном событии",
                      system: "Тут описание системы, которая решает начальное событие",
                      winEvent: "Тут событие положительное после применение системы",
                      loseEvent: "Тут событие, если система не помогла"
                      },
                      {
                        content:"Здесь инфо о начальном событии",
                        system: "Тут описание системы, которая решает начальное событие",
                        winEvent: "Тут событие положительное после применение системы",
                        loseEvent: "Тут событие, если система не помогла"
                        },
                        ...
                    ]`, 
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

        setResponse(response.data.choices[0].message.content);
      } catch (error) {
        console.error('Error fetching response from API:', error);
      }
    };

    fetchData();
  }

  const setHandleRequest = (inputs:string[]) => {
    console.log(inputs);
    const fetchData = async () => {
      try {
        const apiKey = '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';
        const requestBody = {
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'user',
              content: `Представь, что ты проектировщик атомной электростанции. Вот начальные события: ${inputs} Используй эти начальные рисковые события, а также систему, которая решит соответствующее рисковое событие. А также добавь исход положительный и отрицательный от применения этой системы. Ответ дай в формате json. [
                {
                      content:"Здесь вставляешь то событие, которое я тебе дал из массива",
                      system: "Тут описание системы, которая решает это начальное событие",
                      winEvent: "Тут событие положительное после применение системы",
                      loseEvent: "Тут событие, если система не помогла"
                      },
                      {
                        content:"Здесь вставляешь то событие, которое я тебе дал из массива",
                        system: "Тут описание системы, которая решает это начальное событие",
                        winEvent: "Тут событие положительное после применение системы",
                        loseEvent: "Тут событие, если система не помогла"
                        },
                        ...
                    ]`, 
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
        setResponse(response.data.choices[0].message.content);
      } catch (error) {
        console.error('Error fetching response from API:', error);
      }
    };

    fetchData();
  }

  const handleSubmit = (inputs: string[]) => {
    // Обработка логики отправки данных, например, отправка на сервер

    
    setHandleRequest(inputs);
    setInputs(inputs);
    console.log('Отправлены следующие инпуты:', inputs);
  };

  const handleClosePopup = () => {
    setPopupOpen(false);
    setRequestDafault();
  };

  const handleConfirmPopup = () => {
    // Добавьте логику для подтверждения
    handleClosePopup();
    setVisibleInputs(true);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div>
            {/* <h1 className="text-2xl font-semibold mb-4">Next.js Popup Example</h1> */}
            {/* <button onClick={handleOpenPopup}>Открыть Popup</button> */}

            {(
                <Popup
                  title="Создать начальные события вручную?"
                  onClose={handleClosePopup}
                  onConfirm={handleConfirmPopup}
                  isOpen = {isPopupOpen}
                />
            )}
            <div>
              <h1 className="text-2xl font-semibold mb-4">Начальные события</h1>
              {visibleInputs && <DynamicInputsForm onSubmit={handleSubmit} />}              
              {response && <div>{response}</div>}
            </div>
        </div>
    </main>
  );
};

export default Home;
