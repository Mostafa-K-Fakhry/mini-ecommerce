import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';
import { apiErrorMessage } from '../../core/api-error';
import { Order } from '../../models/order.model';
import { Product } from '../../models/product.model';
import { OrderService } from '../../services/order.service';
import { ProductService } from '../../services/product.service';

@Component({
  imports: [RouterLink],
  templateUrl: './admin-dashboard.page.html',
  styleUrl: './admin-dashboard.page.css',
})
export class AdminDashboardPage implements OnInit {
  products: Product[] = []; orders: Order[] = []; loading = true; error = '';
  constructor(private readonly productsApi: ProductService, private readonly ordersApi: OrderService) {}
  get pendingOrders(): number { return this.orders.filter((order) => order.status === 'Pending').length; }
  ngOnInit(): void { forkJoin({ productResult: this.productsApi.list(), orders: this.ordersApi.list() }).subscribe({ next: ({ productResult, orders }) => { this.products = productResult.products; this.orders = orders; this.loading = false; }, error: (error) => { this.error = apiErrorMessage(error); this.loading = false; } }); }
}
