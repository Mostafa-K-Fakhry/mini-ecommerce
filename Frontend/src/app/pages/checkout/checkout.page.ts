import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { apiErrorMessage } from '../../core/api-error';
import { Cart, CartLine } from '../../models/cart.model';
import { CheckoutPayload, PAYMENT_METHOD } from '../../models/order.model';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';

@Component({
  imports: [CurrencyPipe, ReactiveFormsModule, RouterLink, NgFor, NgIf],
  templateUrl: './checkout.page.html',
  styleUrl: './checkout.page.css',
})
export class CheckoutPage implements OnInit {
  cart: Cart | null = null;
  loading = true;
  placing = false;
  submitted = false;
  error = '';
  readonly paymentMethod = PAYMENT_METHOD;
  private readonly fb = inject(NonNullableFormBuilder);
  readonly deliveryForm = this.fb.group({
    fullName: ['', Validators.required],
    phone: ['', [Validators.required, Validators.pattern('^[0-9+][0-9\\s-]{6,14}$')]],
    address: ['', Validators.required],
    city: ['', Validators.required],
  });

  constructor(private readonly cartApi: CartService, private readonly ordersApi: OrderService, private readonly router: Router) {}
  ngOnInit(): void { this.cartApi.getCart().subscribe({ next: (cart) => { this.cart = cart; this.loading = false; }, error: (error) => { this.error = apiErrorMessage(error); this.loading = false; } }); }
  productOf(line: CartLine): Product | null { return typeof line.productId === 'string' ? null : line.productId; }
  total(): number { return this.cart?.products.reduce((sum, line) => sum + (this.productOf(line)?.price ?? 0) * line.quantity, 0) ?? 0; }
  placeOrder(): void {
    this.submitted = true;
    if (this.deliveryForm.invalid) {
      this.deliveryForm.markAllAsTouched();
      return;
    }

    this.placing = true;
    this.error = '';
    const payload: CheckoutPayload = {
      customerInfo: this.deliveryForm.getRawValue(),
      paymentMethod: this.paymentMethod,
    };

    this.ordersApi.checkout(payload).subscribe({
      next: ({ msg }) => {
        this.cartApi.clearItemCount();
        this.router.navigate(['/orders'], { state: { orderMessage: msg || 'Order placed successfully.' } });
      },
      error: (error) => { this.error = apiErrorMessage(error); this.placing = false; },
    });
  }
}
