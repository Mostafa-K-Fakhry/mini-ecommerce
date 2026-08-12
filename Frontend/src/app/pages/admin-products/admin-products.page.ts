import { CurrencyPipe, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { apiErrorMessage } from '../../core/api-error';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  imports: [CurrencyPipe, NgFor, RouterLink],
  templateUrl: './admin-products.page.html',
  styleUrl: './admin-products.page.css',
})
export class AdminProductsPage implements OnInit {
  products: Product[] = []; loading = true; error = ''; message = ''; deleteTarget: Product | null = null; deleting = false;
  constructor(private readonly productsApi: ProductService) {}
  ngOnInit(): void { this.load(); }
  confirmDelete(): void { if (!this.deleteTarget) return; this.deleting = true; this.productsApi.delete(this.deleteTarget._id).subscribe({ next: ({ message }) => { this.message = message || 'Product deleted successfully.'; this.deleteTarget = null; this.deleting = false; this.load(); }, error: (error) => { this.error = apiErrorMessage(error); this.deleting = false; } }); }
  private load(): void { this.loading = true; this.productsApi.list().subscribe({ next: ({ products }) => { this.products = products; this.loading = false; }, error: (error) => { this.error = apiErrorMessage(error); this.loading = false; } }); }
}
