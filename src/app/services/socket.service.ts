import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { environment } from '../../environments/environment';
import { fromEvent, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SocketService {
  private socket!: Socket;

  connect() {
    const token = localStorage.getItem('token');
    this.socket = io(environment.apiUrl, {
      auth: { token },
      withCredentials: true
    });

    this.socket.on('connect', () => {
      console.log('✅ Connected to Socket.IO server');
    });

    this.socket.on('disconnect', reason => {
      console.warn('❌ Disconnected:', reason);
    });
  }

  onOrderUpdate(callback: (data: any) => void) {
    this.socket.on('orderUpdate', callback);
  }

  sendMessage(recipientId: string, text: string, orderId?: string) {
    this.socket.emit('sendMessage', { recipientId, text, orderId });
  }

    onNewMessage(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('receiveMessage', (message) => {
        observer.next(message);
      });
    });
  }

  disconnect() {
    if (this.socket) this.socket.disconnect();
  }
}
