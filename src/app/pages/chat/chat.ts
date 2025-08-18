import { Component, inject, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MessageService } from '../../services/message.service';
import { DatePipe, CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { SocketService } from '../../services/socket.service';
import { ChatService } from '../../services/chat-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
    // DatePipe,
    // FormsModule,

  ],
  templateUrl: './chat.html',
  styleUrl: './chat.scss'
})
export class Chat  implements  OnDestroy,OnChanges  {
  @Input() order: any;
  messages:any = [];
  newMessage = '';
  selectedRecipientId = '';
  messageSub!: Subscription;
  currentUserId = '';

  constructor(
    private socketService: SocketService,
    private authService: AuthService,
    public chatService: ChatService
  ) {}

  ngOnInit() {
    const user = this.authService.getUser();
    this.currentUserId = user?.id;

    if (this.currentUserId) {
      this.socketService.connect(); // only once!

      this.messageSub = this.socketService.onNewMessage().subscribe((msg: any) => {
  if (msg.orderId === this.order._id) { // only check order
    this.messages.push({
      text: msg.text,
      fromSelf: msg.senderId === this.currentUserId
    });
  }
});

    }
  }

ngOnChanges(changes: SimpleChanges) {
  if (changes['order'] && this.order) {
    const user = this.authService.getUser();
    this.currentUserId = user?.id || user?._id || user?.userId;

    // Set recipient
    if (this.currentUserId === this.order.buyerId._id) {
      this.selectedRecipientId = this.order.freelancerId._id;
    } else {
      this.selectedRecipientId = this.order.buyerId._id;
    }

    // Load history
    this.chatService.getMessagesWith(this.order._id).subscribe((res: any) => {
      this.messages = res.map((msg: any) => ({
        text: msg.text,
        fromSelf: msg.senderId._id === this.currentUserId
      }));
    });

    // Subscribe to socket only after recipientId is set
    this.messageSub?.unsubscribe();
    this.messageSub = this.socketService.onNewMessage().subscribe((msg: any) => {
      if (
        msg.orderId === this.order._id &&
        (msg.senderId === this.selectedRecipientId || msg.recipientId === this.selectedRecipientId)
      ) {
        this.messages.push({
          text: msg.text,
          fromSelf: msg.senderId === this.currentUserId
        });
      }
    });
  }
}
  sendMessage() {
    if (!this.newMessage.trim() || !this.selectedRecipientId) return;

    this.socketService.sendMessage(this.selectedRecipientId, this.newMessage, this.order?._id);

    // this.messages.push({ text: this.newMessage, fromSelf: true });
    this.newMessage = '';
  }

  ngOnDestroy() {
    this.messageSub?.unsubscribe();
    this.socketService.disconnect();
  }
}
