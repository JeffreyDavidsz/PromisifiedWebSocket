const WebSocket = require("ws");
const EventEmitter = require("events");

/*************************************************************************************
 * This class is a wrapper for the WebSocket class that comes with Node.js. It adds
 * the following functionality:
 * - Promise-based send method
 * - Event emitter for websocketOpen and websocketError
 * - Status event emitter
 *************************************************************************************/

class PromisifiedWebSocket extends EventEmitter {
  constructor(url) {
    super(); // Initialize the EventEmitter
    this.ws = new WebSocket(url);
    this.connectionOpen = false; // Flag to track whether the connection is open

    // Bind the event listeners
    this.ws.on("open", () => {
      this.emit("status", "open");
      this.connectionOpen = true;
      this.emit("websocketOpen");
    });
    this.ws.on("error", (error) => {
      this.emit("websocketError", error);
    });
    this.ws.on("close", () => {
      this.emit("status", "connection closed");
      this.emit("websocketClose");
    });
  }

  // The send method returns a promise that resolves when the response is received
  send(cmd) {
    return new Promise(async (resolve, reject) => {
      if (!this.connectionOpen) {
        this.once("websocketOpen", () => {
          this.ws.send(cmd, (error) => {
            if (error) {
              this.emit("websocketError", error);
              reject(error);
            }
          });
        });
      } else {
        this.ws.send(cmd, (error) => {
          if (error) {
            this.emit("websocketError", error);
            reject(error);
          }
        });
      }

      // Wait for the response
      this.ws.on("message", (message) => {
        this.emit("update", message);
        resolve(message);
      });
    });
  }

  // Close the connection
  close() {
    this.ws.close();
    this.connectionOpen = false;
    this.emit("status", "connection closed");
  }
}

module.exports = PromisifiedWebSocket;
