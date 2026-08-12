import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, NonNullableFormBuilder } from '@angular/forms';
import { apiErrorMessage } from '../../core/api-error';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { ProductCardComponent } from '../../shared/product-card/product-card.component';

@Component({
  imports: [ReactiveFormsModule, ProductCardComponent],
  templateUrl: './products.page.html',
  styleUrl: './products.page.css',
})
export class ProductsPage implements OnInit {
  products: Product[] = []; loading = true; error = ''; searching = false;
  private readonly fb = inject(NonNullableFormBuilder);
  readonly searchForm = this.fb.group({ title: [''] });
  constructor(private readonly productsApi: ProductService) {}
  ngOnInit(): void { this.load(); }
  search(): void { const title = this.searchForm.controls.title.value.trim(); if (!title) { this.clearSearch(); return; } this.searching = true; this.load(title); }
  clearSearch(): void { this.searchForm.reset(); this.searching = false; this.load(); }
  private load(title?: string): void {
    this.loading = true; this.error = '';
    (title ? this.productsApi.search(title) : this.productsApi.list()).subscribe({ next: ({ products }) => { this.products = products; this.loading = false; }, error: (error) => { this.error = apiErrorMessage(error); this.loading = false; } });
  }
}
