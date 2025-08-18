import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../models/order.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private apiUrl = environment.apiUrl +'/api/orders';

  constructor(private http: HttpClient) {}

  getUserOrders(userId: string): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/user/${userId}`);
  }

  updateOrderStatus(orderId: string, status: string) {
    return this.http.put(`${this.apiUrl}/${orderId}/status`, { status });
  }

  createOrder(serviceId: string) {
    return this.http.post(`${this.apiUrl}`, { serviceId });
  }
}
