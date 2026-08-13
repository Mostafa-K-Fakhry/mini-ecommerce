import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { apiErrorMessage } from '../../core/api-error';
import { Product } from '../../models/product.model';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';

@Component({
  imports: [CurrencyPipe, FormsModule, RouterLink],
  templateUrl: './product-details.page.html',
  styleUrl: './product-details.page.css',
})
export class ProductDetailsPage implements OnInit {
  product: Product | null = null;
  loading = true;
  error = '';
  message = '';
  quantity = 1;
  adding = false;
  constructor(
    private readonly route: ActivatedRoute,
    private readonly productsApi: ProductService,
    private readonly cartApi: CartService,
    private readonly auth: AuthService,
    private readonly router: Router,
  ) {}
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.error = 'Product not found.';
      this.loading = false;
      return;
    }
    this.productsApi.get(id).subscribe({
      next: ({ product }) => {
        this.product = product;
        this.loading = false;
      },
      error: (error) => {
        this.error = apiErrorMessage(error);
        this.loading = false;
      },
    });
  }
  addToCart(): void {
    if (!this.product) return;
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['/login'], { queryParams: { returnUrl: this.router.url } });
      return;
    }
    this.adding = true;
    this.error = '';
    this.message = '';
    this.cartApi.add(this.product._id, Math.max(1, Number(this.quantity))).subscribe({
      next: ({ message }) => {
        this.message = message || 'Product added to cart.';
        this.adding = false;
      },
      error: (error) => {
        this.error = apiErrorMessage(error);
        this.adding = false;
      },
    });
  }
}
