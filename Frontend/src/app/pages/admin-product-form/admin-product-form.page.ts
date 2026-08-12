import { NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { apiErrorMessage } from '../../core/api-error';
import { ProductPayload } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  imports: [NgIf, ReactiveFormsModule, RouterLink],
  templateUrl: './admin-product-form.page.html',
  styleUrl: './admin-product-form.page.css',
})
export class AdminProductFormPage implements OnInit {
  editing = false; loading = false; saving = false; submitted = false; error = ''; private productId: string | null = null;
  private readonly fb = inject(NonNullableFormBuilder);
  readonly form = this.fb.group({ title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(150)]], description: ['', [Validators.required, Validators.minLength(20), Validators.maxLength(2000)]], price: [0, [Validators.required, Validators.min(0.01)]], image: ['', [Validators.required]], category: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]], stock: [0, [Validators.required, Validators.min(0), Validators.pattern(/^\d+$/)]] });
  constructor(private readonly route: ActivatedRoute, private readonly router: Router, private readonly productsApi: ProductService) {}
  ngOnInit(): void { this.productId = this.route.snapshot.paramMap.get('id'); this.editing = !!this.productId; if (this.productId) { this.loading = true; this.productsApi.get(this.productId).subscribe({ next: ({ product }) => { this.form.patchValue(product); this.loading = false; }, error: (error) => { this.error = apiErrorMessage(error); this.loading = false; } }); } }
  submit(): void { this.submitted = true; this.error = ''; if (this.form.invalid) return; this.saving = true; const request = this.editing && this.productId ? this.productsApi.update(this.productId, this.form.getRawValue() as ProductPayload) : this.productsApi.create(this.form.getRawValue() as ProductPayload); request.subscribe({ next: ({ message }) => this.router.navigate(['/admin/products'], { state: { productMessage: message || (this.editing ? 'Product updated successfully.' : 'Product created successfully.') } }), error: (error) => { this.error = apiErrorMessage(error); this.saving = false; } }); }
}
