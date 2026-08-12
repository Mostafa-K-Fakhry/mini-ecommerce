import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { apiErrorMessage } from '../../core/api-error';
import { Cart, CartLine } from '../../models/cart.model';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart.service';

@Component({
  imports: [CurrencyPipe, RouterLink, NgFor, NgIf],
  templateUrl: './cart.page.html',
  styleUrl: './cart.page.css',
})
export class CartPage implements OnInit {
  cart: Cart | null = null; loading = true; error = ''; message = '';
  constructor(private readonly cartApi: CartService) {}
  ngOnInit(): void { this.load(); }
  productOf(line: CartLine): Product | null { return typeof line.productId === 'string' ? null : line.productId; }
  total(): number { return this.cart?.products.reduce((sum, line) => sum + (this.productOf(line)?.price ?? 0) * line.quantity, 0) ?? 0; }
  changeQuantity(line: CartLine, quantity: number): void { if (quantity < 1) { this.remove(line); return; } const product = this.productOf(line); if (!product) return; this.cartApi.updateQuantity(product._id, quantity).subscribe({ next: ({ message }) => { this.message = message; this.load(); }, error: (error) => this.error = apiErrorMessage(error) }); }
  remove(line: CartLine): void { const product = this.productOf(line); if (!product) return; this.cartApi.remove(product._id).subscribe({ next: ({ message }) => { this.message = message; this.load(); }, error: (error) => this.error = apiErrorMessage(error) }); }
  private load(): void { this.loading = true; this.cartApi.getCart().subscribe({ next: (cart) => { this.cart = cart; this.loading = false; }, error: (error) => { this.error = apiErrorMessage(error); this.loading = false; } }); }
}
