import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private currentUser = new BehaviorSubject<string | null>(null);

  currentChatUser$ = this.currentUser.asObservable();

  setCurrentChatUser(userId: string) {
    this.currentUser.next(userId);
  }

  getCurrentChatUser(): string | null {
    return this.currentUser.getValue();
  }

  // Example: get messages between logged-in user and selected user
  getMessagesWith(userId: string) {
    return this.http.get(`${environment.apiUrl}/api/messages/order/${userId}`);
  }

  constructor(private http: HttpClient) {}
}
