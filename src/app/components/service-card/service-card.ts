import { Component, Input } from '@angular/core';
import { Service } from '../../models/service.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { OrderService } from '../../services/order.service';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-service-card',
  imports: [
    CommonModule,
    MatButtonModule
  ],
  templateUrl: './service-card.html',
  styleUrl: './service-card.scss'
})
export class ServiceCard {
  @Input() service!: Service;
  isLoading = false;
  imageFailed = false;

  constructor(
    private orderService: OrderService,
    public authService: AuthService,
    private router: Router
  ) {}
  orderNow() {
    this.isLoading = true;
    this.orderService.createOrder(this.service._id).subscribe({
      next: () => {
        this.isLoading = false;
        alert('Order placed!');
        this.router.navigate(['/orders']);
      },
      error: err => {
        this.isLoading = false;
        alert(err?.error?.message || 'Failed to place order.');
      }
    });
  }
}
