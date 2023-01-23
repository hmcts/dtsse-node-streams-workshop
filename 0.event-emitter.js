
const EventEmitter = require('events');

const emitter = new EventEmitter();

emitter.on("event", () => console.log("Event fired!"));

for (let i = 0; i < 10; i++) {
  emitter.emit("event");
}

// Add another listener to the event emitter that logs "another event"
