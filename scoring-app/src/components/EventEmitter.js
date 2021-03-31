const EventEmitter = require('wolfy87-eventemitter');
var eventEmitterInstance = new EventEmitter();

function listener1() {
    console.log('ONE');
}

function listener2() {
    console.log('TWO');
}
eventEmitterInstance.addListeners('foo', [listener1, listener2]);

export default eventEmitterInstance;
