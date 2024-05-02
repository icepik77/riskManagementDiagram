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

interface OpenAiEvents {
  content: string;
  winEvent: string;
  loseEvent: string;
}


const Home: React.FC = () => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [response, setResponse] = useState<string>('');
  const [visibleInputs, setVisibleInputs] = useState(false);
  const [inputs, setInputs] = useState<string[]>([""]);
  const [eventTreeElements, setEventTreeElements] = useState<EventTreeElement[]>();
  

  //Хранение сгененрированных событий в результате запроса
  let initialEvents = new Array<Event>();
  // let eventTreeElements = new Array<EventTreeElement>();

  const initialDataTree: EventTreeElement[] = [
    {
      name: 'Parent',
      value: 100,
      children: []
    }
  ];
  
  const [dataTree, setDataTree] = useState(initialDataTree);

  // const dataTree :Child[] = [
  //   {
  //     name: 'Parent',
  //     value: 100,
  //     children:[
  //       // { name: 'Child 1', value: 50 },
  //       // { name: 'Child 2', value: 30 },
  //       // { name: 'Child 3', value: 20 },
  //     ],
  //   },
  // ];

  useEffect(() => {
    console.log("useEffect");
    setPopupOpen(true);
  }, [])


  function convertEventsToChildren(events: Event[]): EventTreeElement[] {
    const totalValue = events.length;
    const childValue = totalValue > 0 ? 100 / totalValue : 0;
  
    return events.map(event => {
      const child: EventTreeElement = {
        name: event.data,
        value: childValue
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
                    data: element.content,
                    winEvent: {
                        data: element.winEvent,
                        winEvent: undefined,
                        loseEvent: undefined
                    },
                    loseEvent: {
                        data: element.loseEvent,
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
              content: `Представь, что ты проектировщик атомной электростанции. Вот начальные события: ${inputs} Используй эти начальные рисковые события, построй два варианта событий от начального - положительный и отрицательный. Ответ дай в формате json. [
                      {
                        "content": "Здесь вставляешь то событие, которое я тебе дал из массива",                      
                        "winEvent": "Тут событие положительное после применение системы",
                        "loseEvent": "Тут событие, если система не помогла"
                      },
                      {
                        "content": "Здесь вставляешь то событие, которое я тебе дал из массива",                     
                        "winEvent": "Тут событие положительное после применение системы",
                        "loseEvent": "Тут событие, если система не помогла"
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

        console.log(response.data.choices[0].message.content);

        let data: OpenAiEvents[] = JSON.parse(response.data.choices[0].message.content);

        console.log(data);

        // Проверяем, что data не пустой и не undefined
        if (data && data.length > 0) {
            data.forEach((element: OpenAiEvents) => {
                // Добавляем новый элемент в массив initialEvents
                initialEvents.push({
                    data: element.content,
                    winEvent: {
                        data: element.winEvent,
                        winEvent: undefined,
                        loseEvent: undefined
                    },
                    loseEvent: {
                        data: element.loseEvent,
                        winEvent: undefined,
                        loseEvent: undefined
                    }
                });
            });
        }

        
        setResponse(response.data.choices[0].message.content);
        console.log(initialEvents);
        setEventTreeElements(convertEventsToChildren(initialEvents));
        // const eventTreeElements: EventTreeElement[] = convertEventsToChildren(initialEvents);

        // // Проверяем, определен ли уже массив children в dataTree[0]
        // if (dataTree[0].children) {
        //   // Если массив children уже определен, добавляем новые дочерние элементы к нему
        //   dataTree[0].children = [...dataTree[0].children, ...eventTreeElements];
        // } else {
        //   // Если массив children еще не определен, просто присваиваем ему новый массив
        //   dataTree[0].children = eventTreeElements;
        // }

        // // Обновляем состояние dataTree
        // setDataTree([...dataTree]);

        // console.log(dataTree[0].children);

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

            {eventTreeElements && <div>
              <h1>Tree Chart Example</h1>
              <TreeChart eventTreeElements={eventTreeElements}/>
            </div>}
        </div>
        
    </main>
  );
};

export default Home;
