# PromisifiedWebSocket

This class is a wrapper for [ws: a Node.js WebSocket library](https://github.com/websockets/ws). 
It adds the following functionality:

Promise-based send method
Event emitter for websocketOpen and websocketError
Status event emitter

## Install
```javascript
npm install promisifiedwebsocket
yarn add promisifiedwebsocket
```

```javascript
const PromisifiedWebSocket = require('promisifiedwebsocket')

const url = '127.0.0.1:1234/testPath' // Change this to your likes
const ws = new PromisifiedWebSocket(url)

```

You can use the `send(data)` & `close()`;

```javascript
const result = await ws.send('getFaderList')
console.log(`The result: ${result}`)
ws.close()
```

The following listeners are added:
```javascript
ws.on('websocketError', (error) => {
    console.log(`WebSocket error: ${error}`)
})
ws.on('status', (status) => {
    // Statuses that will be emitted are: open & connaction closed
    console.log(`Status change: ${status}`)
})
ws.on('websocketOpen', () => {
    console.log('Connection open')
})
ws.on('websocketClose', () => {
    console.log('Connection closed')
})
```
