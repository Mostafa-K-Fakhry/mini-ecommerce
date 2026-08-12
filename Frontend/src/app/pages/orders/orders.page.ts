import { CurrencyPipe, DatePipe, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { apiErrorMessage } from '../../core/api-error';
import { Order } from '../../models/order.model';
import { OrderService } from '../../services/order.service';

@Component({
  imports: [CurrencyPipe, DatePipe, NgFor, RouterLink],
  templateUrl: './orders.page.html',
  styleUrl: './orders.page.css',
})
export class OrdersPage implements OnInit {
  orders: Order[] = []; loading = true; error = ''; successMessage = history.state?.['orderMessage'] ?? '';
  constructor(private readonly ordersApi: OrderService) {}
  ngOnInit(): void { this.ordersApi.list().subscribe({ next: (orders) => { this.orders = orders; this.loading = false; }, error: (error) => { this.error = apiErrorMessage(error); this.loading = false; } }); }
}
