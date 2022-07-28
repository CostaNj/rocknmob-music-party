import socketIOClient from "socket.io-client";

let socket = null

export const getSocket = () => socket

export const openSocketConnection = () => {
  if(!socket) {
    socket = socketIOClient.connect('http://localhost:3002',{reconnect:true, transports: ['websocket', 'polling'] });
  }
}

export const closeSocketConnection = () => {
  if(socket) {
    socket = null
  }
}
