import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-profile',
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
  ],
  templateUrl: './profile.html',
  styleUrl: './profile.scss'
})
export class Profile {
  user: any;

  constructor(private auth: AuthService, private router: Router) {
    this.user = this.auth.getUser();
  }

  get initials(): string {
    const name: string = this.user?.name || '';
    return name.split(' ').filter(Boolean).slice(0, 2).map(p => p[0].toUpperCase()).join('') || '?';
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
