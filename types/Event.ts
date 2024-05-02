interface Event {
    data: string;
    winEvent?: Event;
    loseEvent?: Event;
  }

export default Event;