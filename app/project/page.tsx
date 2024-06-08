// pages/index.tsx
'use client'

import React, { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import Popup from '../../components/Popup';
import DynamicInputsForm from '@/components/InputsList';
import TreeChart from  '../../components/TreeChart';
import Event from '@/types/Event';
import EventTreeElement from '@/types/EventTree';
import API_KEY from '@/config/config';
import Tree from '../ui/Tree';
import DialogForm from '../ui/DialogForm';

interface OpenAiEvents {
  content: string;
  winEvent: string;
  loseEvent: string;
}


const Home: React.FC = () => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [response, setResponse] = useState<string>('');
  const [visibleInputs, setVisibleInputs] = useState(true);
  const [inputs, setInputs] = useState<string[]>([""]);
  const [eventTreeElements, setEventTreeElements] = useState<EventTreeElement[]>();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [context, setContext] = useState('');
  

  //Хранение сгененрированных событий в результате запроса
  let initialEvents = new Array<Event>();
  // let eventTreeElements = new Array<EventTreeElement>();

  const initialDataTree: EventTreeElement[] = [
    {
      title: 'Parent',
      children: []
    }
  ];
  
  const [dataTree, setDataTree] = useState(initialDataTree);


  useEffect(() => {
    console.log("useEffect");
    setIsDialogOpen(true);
  }, [])

  // useEffect(() =>{
  //   console.log("eventTreeElements: " + eventTreeElements);
  // }, [])


  function convertEventsToChildren(events: Event[]): EventTreeElement[] {
    const totalValue = events.length;
  
  
    return events.map(event => {
      const child: EventTreeElement = {
        title: event.title,
      };
  
      if (event.winEvent || event.loseEvent) {
        const childEvents: Event[] = [];
        if (event.winEvent) childEvents.push(event.winEvent);
        if (event.loseEvent) childEvents.push(event.loseEvent);
        child.children = convertEventsToChildren(childEvents);
      }
  
      return child;
    });
  }

  const setRequestDafault = () => {
    const fetchData = async () => {
      try {
        const apiKey = API_KEY;
        const requestBody = {
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'user',
              content: `Представь, что ты руководитель разработки приложения для доставки продуктов. 
                        
                        Назови 6 начальных рисковых событий, а также построй два варианта событий  от начального - положительный и отрицательный. Ответ дай в формате json. [
                      {
                        "content": "Здесь инфо о начальном событии",
                        "winEvent": "Тут событие положительное событие",
                        "loseEvent": "Тут негативное событие"
                      },
                      {
                        "content": "Здесь инфо о начальном событии",
                        "winEvent": "Тут событие положительное событие",
                        "loseEvent": "Тут негативное событие"
                      }, и т.д.
                      
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

        let data: OpenAiEvents[] = JSON.parse(response.data.choices[0].message.content);

        console.log(data);

        // Проверяем, что data не пустой и не undefined
        if (data && data.length > 0) {
            data.forEach((element: OpenAiEvents) => {
                // Добавляем новый элемент в массив initialEvents
                initialEvents.push({
                    title: element.content,
                    winEvent: {
                        title: element.winEvent,
                        winEvent: undefined,
                        loseEvent: undefined
                    },
                    loseEvent: {
                        title: element.loseEvent,
                        winEvent: undefined,
                        loseEvent: undefined
                    }
                });
            });
        }

        
        setResponse(response.data.choices[0].message.content);
        console.log(initialEvents);
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

        console.log(requestBody.messages[0].content);

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

      console.log(response.data.choices[0].message.content);

      let data: EventTreeElement[] = JSON.parse(response.data.choices[0].message.content);

      console.log(data);

      setEventTreeElements(data);
      console.log(initialEvents);

      // Обновляем состояние dataTree
      setDataTree([...dataTree]);

      console.log(dataTree[0].children);

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
    // setRequestDafault();
  };

  const handleConfirmPopup = () => {
    // Добавьте логику для подтверждения
    setPopupOpen(false);
    setVisibleInputs(true);
  };

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleSubmitContext = (context: string) => {
    console.log("Submitted context:", context);
    setContext(context);
  };

  return (
    <main className="flex min-h-screen flex-col p-24 relative">
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
      {eventTreeElements && <div>
        <h1>Tree Chart Example</h1>
        {eventTreeElements && <Tree eventTreeElements={eventTreeElements}/>}
      </div>}
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
