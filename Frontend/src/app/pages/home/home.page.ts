import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { ProductCardComponent } from '../../shared/product-card/product-card.component';

@Component({
  imports: [RouterLink, ProductCardComponent],
  templateUrl: './home.page.html',
  styleUrl: './home.page.css',
})
export class HomePage implements OnInit {
  products: Product[] = [];
  loading = true;
  constructor(private readonly productsApi: ProductService) {}
  ngOnInit(): void {
    this.productsApi.list().subscribe({
      next: ({ products }) => {
        this.products = products;
        this.loading = false;
      },
      error: () => (this.loading = false),
    });
  }
}
