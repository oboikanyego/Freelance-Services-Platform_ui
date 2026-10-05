import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { Loading } from '../services/loading';
import { ChatPopup } from "../components/chat-popup";
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, CommonModule,
    RouterModule,
    MatButtonModule, MatMenuModule, ChatPopup],
  template: `
    <div class="shell">
      <header class="topbar">
        <div class="topbar-inner">
          <a class="brand" routerLink="/">
            <span class="brand-mark material-icons-round">bolt</span>
            FreelanceHub
          </a>

          <nav class="nav-links">
            <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">Home</a>
            <a routerLink="/services" routerLinkActive="active">Browse services</a>
            <a *ngIf="authService.isLoggedIn()" routerLink="/orders" routerLinkActive="active">My orders</a>
            <a *ngIf="user?.role === 'freelancer'" routerLink="/create" routerLinkActive="active">Sell a service</a>
          </nav>

          <div class="nav-actions">
            <ng-container *ngIf="!authService.isLoggedIn(); else signedIn">
              <a mat-button routerLink="/login">Log in</a>
              <a mat-flat-button routerLink="/register">Get started</a>
            </ng-container>

            <ng-template #signedIn>
              <button class="user-chip" [matMenuTriggerFor]="userMenu" aria-label="Account menu">
                <span class="avatar">{{ initials }}</span>
                <span class="user-name">{{ user?.name }}</span>
                <span class="material-icons-round">expand_more</span>
              </button>
              <mat-menu #userMenu="matMenu" xPosition="before">
                <a mat-menu-item routerLink="/profile">
                  <span class="material-icons-round menu-icon">person</span> Profile
                </a>
                <a mat-menu-item routerLink="/orders">
                  <span class="material-icons-round menu-icon">receipt_long</span> My orders
                </a>
                <a *ngIf="user?.role === 'freelancer'" mat-menu-item routerLink="/create">
                  <span class="material-icons-round menu-icon">add_circle</span> Create a service
                </a>
                <button mat-menu-item (click)="logout()">
                  <span class="material-icons-round menu-icon">logout</span> Log out
                </button>
              </mat-menu>
            </ng-template>
          </div>
        </div>
      </header>

      <main class="content">
        <app-chat-popup *ngIf="authService.isLoggedIn()"></app-chat-popup>
        <router-outlet></router-outlet>
      </main>

      <footer class="footer">
        <div class="footer-inner">
          <div>
            <a class="brand" routerLink="/">
              <span class="brand-mark material-icons-round">bolt</span>
              FreelanceHub
            </a>
            <p class="footer-tag">Hire skilled freelancers or offer your own services.</p>
          </div>
          <nav class="footer-links">
            <a routerLink="/services">Browse services</a>
            <a routerLink="/register">Become a freelancer</a>
            <a routerLink="/login">Log in</a>
          </nav>
        </div>
        <div class="footer-bottom">&copy; {{ currentYear }} FreelanceHub. All rights reserved.</div>
      </footer>
    </div>
  `,
  styles: [`
    .shell {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }

    .topbar {
      position: sticky;
      top: 0;
      z-index: 100;
      background: rgba(255, 255, 255, 0.85);
      backdrop-filter: saturate(180%) blur(12px);
      border-bottom: 1px solid var(--line);
    }

    .topbar-inner {
      max-width: var(--container);
      margin: 0 auto;
      height: 68px;
      padding: 0 24px;
      display: flex;
      align-items: center;
      gap: 32px;
    }

    .nav-links {
      display: flex;
      gap: 4px;
      flex: 1;

      a {
        padding: 8px 12px;
        border-radius: 8px;
        color: var(--ink-500);
        font-weight: 500;
        font-size: 0.925rem;
        transition: color .15s, background .15s;

        &:hover { color: var(--ink-900); background: var(--surface-muted); }
        &.active { color: var(--brand-700); background: var(--brand-50); }
      }
    }

    .nav-actions {
      display: flex;
      align-items: center;
      gap: 8px;

      a { white-space: nowrap; }
    }

    .user-chip {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 4px 8px 4px 4px;
      border: 1px solid var(--line);
      border-radius: 999px;
      background: var(--surface);
      cursor: pointer;
      font: inherit;
      color: var(--ink-900);
      transition: box-shadow .15s;

      &:hover { box-shadow: var(--shadow-sm); }
      .material-icons-round { font-size: 18px; color: var(--ink-500); }
    }

    .avatar {
      display: grid;
      place-items: center;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: var(--brand-100);
      color: var(--brand-700);
      font-weight: 700;
      font-size: 0.8rem;
    }

    .user-name {
      font-weight: 600;
      font-size: 0.9rem;
      max-width: 140px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .menu-icon {
      font-size: 20px;
      vertical-align: middle;
      margin-right: 8px;
      color: var(--ink-500);
    }

    .content {
      flex: 1;
    }

    .footer {
      background: var(--ink-900);
      color: #cbd5e1;
      margin-top: 48px;
    }

    .footer-inner {
      max-width: var(--container);
      margin: 0 auto;
      padding: 40px 24px;
      display: flex;
      justify-content: space-between;
      gap: 24px;
      flex-wrap: wrap;

      .brand { color: #fff; }
    }

    .footer-tag {
      margin-top: 12px;
      color: var(--ink-400);
      font-size: 0.9rem;
    }

    .footer-links {
      display: flex;
      gap: 24px;
      align-items: center;
      flex-wrap: wrap;

      a { color: #cbd5e1; font-size: 0.9rem; }
      a:hover { color: #fff; }
    }

    .footer-bottom {
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      text-align: center;
      padding: 18px 24px;
      font-size: 0.825rem;
      color: var(--ink-400);
    }

    @media (max-width: 760px) {
      .topbar-inner { gap: 12px; padding: 0 16px; }
      .nav-links { display: none; }
      .nav-actions { margin-left: auto; gap: 4px; }
      .nav-actions a { padding: 0 12px; }
      .user-name { display: none; }
    }
  `]
})
export class AppLayoutComponent {
  constructor(public loadingService: Loading, public authService: AuthService, private router: Router) {}
  currentYear = new Date().getFullYear();

  get user() {
    return this.authService.getUser();
  }

  get initials(): string {
    const name: string = this.user?.name || '';
    return name.split(' ').filter(Boolean).slice(0, 2).map(p => p[0].toUpperCase()).join('') || '?';
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
