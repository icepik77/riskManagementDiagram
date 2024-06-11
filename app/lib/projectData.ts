
import EventTreeElement from "@/types/EventTree";
  
  interface ProjectData {
    id: number;
    name: string;
    context: string;
    eventTreeElements: EventTreeElement[];
  }
  
  const projectsData: ProjectData[] = [
    {
      id: 1,
      name: 'Project 1',
      context: 'Контекст для проекта 1',
      eventTreeElements: [
        {
          title: 'Событие 1',
          children: [
            { title: 'Положительное событие 1.1' },
            { title: 'Отрицательное событие 1.2' },
          ],
        },
      ],
    },
    {
      id: 2,
      name: 'Project 2',
      context: 'Контекст для проекта 2',
      eventTreeElements: [
        {
          title: 'Событие 2',
          children: [
            { title: 'Положительное событие 2.1' },
            { title: 'Отрицательное событие 2.2' },
          ],
        },
      ],
    },
  ];
  
  export default projectsData;
  