import { Injectable } from '@angular/core';
import * as socketIo from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  socketio: Socket;
  observer: any;
  serverurl = 'http://localhost:4200'
  constructor() { }

  // socket configuration //////////////////////////////////////

  taskAnyNew() {
    const observable = new Observable<any>(observer => {
      this.socketio.on('task:save', (data) => {
        observer.next(data);
      });
    });
    return observable;
  }

  // Socket connection
  Connectsocket(type): Observable<number> {
    this.observer = new Observable();
    if (type.type === 'connect') {
      this.socketio = socketIo(this.serverurl);
      this.socketio.emit('info', type.username);
    }
    if (type.type === 'disconnect') {
      this.socketio.emit('onDisconnect','');
    }
    return this.createObservable();
  }
  // create an observerable
  createObservable(): Observable<number> {
    return new Observable<number>(observer => {
      this.observer = observer;
    });
  }
}
export interface Socket {
  _callbacks: any;
  on(event: string, callback: (data: any) => void );
  emit(event: string, data: any);
  disconnect();
  removeAllListeners(event: string);
}