import { CurrencyPipe, DatePipe, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { apiErrorMessage } from '../../core/api-error';
import { ORDER_STATUSES, Order, OrderStatus } from '../../models/order.model';
import { OrderService } from '../../services/order.service';

@Component({
  imports: [CurrencyPipe, DatePipe, FormsModule, NgFor, RouterLink],
  templateUrl: './admin-orders.page.html',
  styleUrl: './admin-orders.page.css',
})
export class AdminOrdersPage implements OnInit {
  orders: Order[] = [];
  readonly statuses = ORDER_STATUSES;
  loading = true;
  error = '';
  message = '';
  updatingId = '';
  constructor(private readonly ordersApi: OrderService) {}
  ngOnInit(): void {
    this.ordersApi.list().subscribe({
      next: (orders) => {
        this.orders = orders;
        this.loading = false;
      },
      error: (error) => {
        this.error = apiErrorMessage(error);
        this.loading = false;
      },
    });
  }
  updateStatus(order: Order, value: string): void {
    if (!ORDER_STATUSES.includes(value as OrderStatus) || order.status === value) return;
    this.updatingId = order._id;
    this.error = '';
    this.ordersApi.updateStatus(order._id, value as OrderStatus).subscribe({
      next: ({ order: updated, message }) => {
        const index = this.orders.findIndex((item) => item._id === updated._id);
        if (index >= 0) this.orders[index] = updated;
        this.message = message;
        this.updatingId = '';
      },
      error: (error) => {
        this.error = apiErrorMessage(error);
        this.updatingId = '';
      },
    });
  }
}
