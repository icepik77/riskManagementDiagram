interface Event {
    title: string;
    winEvent?: Event;
    loseEvent?: Event;
  }

export default Event;