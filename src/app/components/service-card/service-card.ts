import { Component, Input } from '@angular/core';
import { Service } from '../../models/service.model';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon'; // if you use any icons
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { OrderService } from '../../services/order.service';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-service-card',
  imports: [
    MatCardModule,
    MatIconModule, // optional, for icons
    CommonModule,
    MatButtonModule
  ],
  templateUrl: './service-card.html',
  styleUrl: './service-card.scss'
})
export class ServiceCard {
  @Input() service!: Service;
  isLoading = false;

  constructor(
    private orderService: OrderService,
    public authService: AuthService,
    private router: Router
  ) {}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    console.log("Data ========",this.service)
  }
  
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
