import { CurrencyPipe, DatePipe, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { catchError, forkJoin, map, of } from 'rxjs';
import { apiErrorMessage } from '../../core/api-error';
import { Order, OrderLine } from '../../models/order.model';
import { Product } from '../../models/product.model';
import { OrderService } from '../../services/order.service';
import { ProductService } from '../../services/product.service';

@Component({
  imports: [CurrencyPipe, DatePipe, NgFor, RouterLink],
  templateUrl: './order-details.page.html',
  styleUrl: './order-details.page.css',
})
export class OrderDetailsPage implements OnInit {
  order: Order | null = null;
  loading = true;
  error = '';
  readonly productsById = new Map<string, Product>();

  constructor(
    private readonly route: ActivatedRoute,
    private readonly ordersApi: OrderService,
    private readonly productsApi: ProductService,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.error = 'Order not found.';
      this.loading = false;
      return;
    }

    this.ordersApi.get(id).subscribe({
      next: (order) => {
        this.order = order;
        this.loading = false;
        this.loadOrderedProducts(order.products);
      },
      error: (error) => {
        this.error = apiErrorMessage(error);
        this.loading = false;
      },
    });
  }

  productFor(item: OrderLine): Product | undefined {
    return this.productsById.get(item.productId);
  }

  private loadOrderedProducts(items: OrderLine[]): void {
    const productIds = [...new Set(items.map((item) => item.productId))];
    if (!productIds.length) return;

    forkJoin(productIds.map((productId) => this.productsApi.get(productId).pipe(
      map(({ product }) => product),
      catchError(() => of(null)),
    ))).subscribe((products) => {
      products.forEach((product) => {
        if (product) this.productsById.set(product._id, product);
      });
    });
  }
}
