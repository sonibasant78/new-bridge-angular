import { Injectable } from '@angular/core';
import { Observable, observable, Observer } from 'rxjs';
// import * as io from 'socket.io-client';
import { io, Socket } from 'socket.io-client';


@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  socket: Socket;
  url = "ws://142.93.219.133/"
  // url = "ws://raphael-dashboard.hackerkernel.com/"
  // url = "ws://localhost:9000/"

  constructor() {
    // this.socket = io(this.url, {
    //   path: '/bridge/test',
    //   transports: ["websocket"]
    // })

    this.socket = io('ws://localhost:9000/', { transports: ["websocket"] })
  }

  listen(eventName: string): Observable<any> {
    return new Observable((observer) => {
      this.socket.on(eventName, (data: any) => {
        observer.next(data);
      })
    })
  }

  emit(eventName: string, data: any) {
    this.socket.emit(eventName, data);
  }

  disconnect() {
    this.socket.disconnect();
  }
}
