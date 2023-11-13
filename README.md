# PromisifiedWebSocket

This class is a wrapper for the WebSocket class that comes with Node.js. It adds
the following functionality:

Promise-based send method
Event emitter for websocketOpen and websocketError
Status event emitter

```javascript
const PromisifiedWebSocket = require('./PromisifiedWebSocket')

const url = '127.0.0.1:1234/testPath'
const ws = new PromisifiedWebSocket(url)

```

You can use the `send(data)`, `close()`;

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
    // We have status open, connection closed
    console.log(`Status change: ${status}`)
})
ws.on('websocketOpen', () => {
    console.log('Connection open')
})
ws.on('websocketClose', () => {
    console.log('Connection closed')
})
```
