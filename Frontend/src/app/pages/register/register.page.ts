import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  ReactiveFormsModule,
  NonNullableFormBuilder,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { apiErrorMessage } from '../../core/api-error';
import { AuthService } from '../../services/auth.service';

function passwordsMatch(control: AbstractControl): ValidationErrors | null {
  return control.get('password')?.value === control.get('confirmpassword')?.value
    ? null
    : { passwordMismatch: true };
}

@Component({
  imports: [ReactiveFormsModule, RouterLink, NgIf],
  templateUrl: './register.page.html',
  styleUrl: './register.page.css',
})
export class RegisterPage {
  submitted = false;
  loading = false;
  error = '';
  private readonly fb = inject(NonNullableFormBuilder);
  readonly form = this.fb.group(
    {
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmpassword: ['', Validators.required],
    },
    { validators: passwordsMatch },
  );
  constructor(
    private readonly auth: AuthService,
    private readonly router: Router,
  ) {}
  submit(): void {
    this.submitted = true;
    this.error = '';
    if (this.form.invalid) return;
    this.loading = true;
    this.auth.register(this.form.getRawValue()).subscribe({
      next: () => this.router.navigateByUrl('/products'),
      error: (error) => {
        this.error = apiErrorMessage(error, 'Unable to create your account.');
        this.loading = false;
      },
    });
  }
}
