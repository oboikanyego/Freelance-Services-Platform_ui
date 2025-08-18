import { Component, EventEmitter, inject, Input, Output, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ChatService } from '../services/chat-service';
import { CommonModule } from '@angular/common';
import { Chat } from "../pages/chat/chat";

@Component({
  selector: 'app-chat-popup',
  standalone: true,
  imports: [CommonModule, Chat],
  templateUrl: './chat-popup.html',
  styleUrls: ['./chat-popup.scss']
})
export class ChatPopup implements OnInit {
  auth = inject(AuthService);
  chatService = inject(ChatService);

  showPopup = false;
  conversations: any[] = [];
  userId: any;
  @Input() order: any;
  @Input() showPopupChat: any;
  @Output() close = new EventEmitter<void>();

  ngOnInit(): void {
    const user = this.auth.getUser();
    this.userId = user?.id || user?._id;
    const recipientId =
      this.userId === this.order?.buyerId?._id
        ? this.order?.freelancerId?._id
        : this.order?.buyerId?._id;

    if (!recipientId) {
      console.warn('Recipient ID not found');
      return;
    }

    this.chatService.getMessagesWith(recipientId).subscribe((res: any) => {
      this.conversations = res;
    });

    this.chatService.currentChatUser$.subscribe(userId => {
      if (userId) {
        // this.loadMessages(userId);
      }
    });
  }

  togglePopup() {
    this.showPopup = !this.showPopup;
  }

  openChat(userId: string) {
    this.chatService.setCurrentChatUser(userId);
    this.showPopup = false;
  }

  toggleChat() {
    this.close.emit();
  }
}
