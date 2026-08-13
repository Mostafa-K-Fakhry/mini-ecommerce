import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { API_BASE_URL } from '../core/api.config';
import { Cart } from '../models/cart.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly url = `${API_BASE_URL}/cart`;
  private readonly itemCountState = signal(0);
  readonly itemCount = this.itemCountState.asReadonly();

  constructor(private readonly http: HttpClient) {}

  getCart(): Observable<Cart | null> {
    return this.http.get<{ cart: Cart }>(this.url).pipe(
      catchError((error: HttpErrorResponse) =>
        error.status === 404
          ? of({ cart: null })
          : (() => {
              throw error;
            })(),
      ),
      map(({ cart }) => cart),
      tap((cart) => this.setItemCount(cart)),
    );
  }
  add(productId: string, quantity: number): Observable<{ message: string; cart: Cart }> {
    return this.http
      .post<{ message: string; cart: Cart }>(this.url, { productId, quantity })
      .pipe(tap(({ cart }) => this.setItemCount(cart)));
  }
  updateQuantity(productId: string, quantity: number): Observable<{ message: string }> {
    return this.http
      .patch<{ message: string }>(`${this.url}/${productId}`, { quantity })
      .pipe(tap(() => this.refreshItemCount()));
  }
  remove(productId: string): Observable<{ message: string }> {
    return this.http
      .delete<{ message: string }>(`${this.url}/${productId}`)
      .pipe(tap(() => this.refreshItemCount()));
  }

  refreshItemCount(): void {
    this.getCart().subscribe({ error: () => this.clearItemCount() });
  }

  clearItemCount(): void {
    this.itemCountState.set(0);
  }

  private setItemCount(cart: Cart | null): void {
    this.itemCountState.set(cart?.products.reduce((total, item) => total + item.quantity, 0) ?? 0);
  }
}
