import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, NonNullableFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { apiErrorMessage } from '../../core/api-error';
import { AuthService } from '../../services/auth.service';

@Component({
  imports: [ReactiveFormsModule, RouterLink, NgIf],
  templateUrl: './login.page.html',
  styleUrl: './login.page.css',
})
export class LoginPage {
  submitted = false; loading = false; error = '';
  private readonly fb = inject(NonNullableFormBuilder);
  readonly form = this.fb.group({ email: ['', [Validators.required, Validators.email]], password: ['', Validators.required] });
  constructor(private readonly auth: AuthService, private readonly router: Router, private readonly route: ActivatedRoute) {}
  submit(): void {
    this.submitted = true; this.error = '';
    if (this.form.invalid) return;
    this.loading = true;
    this.auth.login(this.form.getRawValue()).subscribe({
      next: () => this.router.navigateByUrl(this.route.snapshot.queryParamMap.get('returnUrl') || '/products'),
      error: (error) => { this.error = apiErrorMessage(error, 'Unable to log in. Please check your credentials.'); this.loading = false; },
    });
  }
}
