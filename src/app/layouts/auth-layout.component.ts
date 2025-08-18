import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Loading } from '../services/loading';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ChatPopup } from "../components/chat-popup";
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'auth-layout',
  standalone: true,
  imports: [RouterOutlet, CommonModule,
    MatProgressBarModule, ChatPopup],
  template: `<app-chat-popup *ngIf="authService.isLoggedIn()"></app-chat-popup>
  <router-outlet></router-outlet>`
})
export class AuthLayoutComponent {
  constructor(public loadingService: Loading,public authService:AuthService) {}
}
