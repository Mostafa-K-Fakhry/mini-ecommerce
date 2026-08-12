import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../core/api.config';
import { CheckoutPayload, Order, OrderStatus } from '../models/order.model';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private readonly url = `${API_BASE_URL}/orders`;
  constructor(private readonly http: HttpClient) {}
  checkout(payload: CheckoutPayload): Observable<{ msg: string; order: Order }> {
    return this.http.post<{ msg: string; order: Order }>(this.url, payload);
  }
  list(): Observable<Order[]> { return this.http.get<Order[]>(this.url); }
  get(id: string): Observable<Order> { return this.http.get<Order>(`${this.url}/${id}`); }
  updateStatus(id: string, status: OrderStatus): Observable<{ message: string; order: Order }> {
    return this.http.patch<{ message: string; order: Order }>(`${this.url}/${id}`, { status });
  }
}
