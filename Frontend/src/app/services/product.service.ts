import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../core/api.config';
import { Product, ProductPayload, ProductsResponse } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly url = `${API_BASE_URL}/products`;

  constructor(private readonly http: HttpClient) {}

  list(): Observable<ProductsResponse> { return this.http.get<ProductsResponse>(this.url); }
  search(title: string): Observable<ProductsResponse> {
    return this.http.get<ProductsResponse>(`${this.url}/search`, { params: new HttpParams().set('title', title) });
  }
  get(id: string): Observable<{ success: boolean; message: string; product: Product }> {
    return this.http.get<{ success: boolean; message: string; product: Product }>(`${this.url}/${id}`);
  }
  create(payload: ProductPayload): Observable<{ product: Product; message: string }> {
    return this.http.post<{ product: Product; message: string }>(this.url, payload);
  }
  update(id: string, payload: ProductPayload): Observable<{ product: Product; message: string }> {
    return this.http.patch<{ product: Product; message: string }>(`${this.url}/${id}`, payload);
  }
  delete(id: string): Observable<{ message: string }> { return this.http.delete<{ message: string }>(`${this.url}/${id}`); }
}
