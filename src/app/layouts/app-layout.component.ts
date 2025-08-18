import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Loading } from '../services/loading';
import { ChatPopup } from "../components/chat-popup";
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, CommonModule,
    MatProgressBarModule,
    RouterModule,
    MatButtonModule, ChatPopup],
  template: `
    <div class="container">
      <section class="home-hero">
        <div class="cta-buttons">
        <div class="welcome-text">👋 Welcome to FreelanceHub</div>
        <div>
          <a mat-raised-button color="primary" routerLink="/services">Browse Services</a>
          <a mat-stroked-button color="accent" routerLink="/login">Login</a>
          <a mat-stroked-button color="warn" (click)="authService.logout()">Logout</a>
          <a mat-stroked-button color="warn" routerLink="/register">Register</a>
        </div>
        </div>
        <span>Your place to hire skilled freelancers or offer your own services.</span>
      </section>

      <main>
        <app-chat-popup *ngIf="authService.isLoggedIn()"></app-chat-popup>
        <router-outlet></router-outlet>
      </main>

      <footer class="app-footer">
        <p>&copy; {{ currentYear }} FreelanceHub. All rights reserved.</p>
      </footer>
    </div>
  `,
  styles: [`
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column; // or row if side nav
  justify-content: space-between;
  background-image: url("https://cdn.pixabay.com/photo/2015/05/28/14/53/ux-788002_1280.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
.home-hero {
  text-align: center;
  padding: 3rem 1rem;
  // background-color: #f9f9f9;
  background-color: #0000004d;

  h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.2rem;
    margin-bottom: 2rem;
  }

  .cta-buttons {
    display: flex;
    gap: 1rem;
    // justify-content: center;
    justify-content: space-between;
    flex-wrap: wrap;
  }
}

.features {
  padding: 2rem;
  background: #fff;
  max-width: 800px;
  margin: 0 auto;

  h2 {
    text-align: center;
    margin-bottom: 1rem;
  }

  ul {
    list-style: none;
    padding: 0;

    li {
      background: #f0f0f0;
      margin: 0.5rem 0;
      padding: 1rem;
      border-radius: 8px;
    }
  }
}

.app-footer {
  background-color: #1e1e1e;
  color: #fff;
  padding: 1rem 0;
  text-align: center;
  margin-top: 3rem;

  .footer-content {
    max-width: 960px;
    margin: 0 auto;
    padding: 0 1rem;

    nav {
      margin-top: 0.5rem;

      a {
        color: #bbb;
        margin: 0 0.75rem;
        text-decoration: none;

        &:hover {
          color: #fff;
        }
      }
    }
  }
}
.welcome-text{
  font-size: x-large;
  font-weight: 700;
}


  `]
})
export class AppLayoutComponent {
  constructor(public loadingService: Loading,public authService:AuthService) {}
  currentYear = new Date().getFullYear();
}
