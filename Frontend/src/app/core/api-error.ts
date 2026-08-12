import { HttpErrorResponse } from '@angular/common/http';

export function apiErrorMessage(error: unknown, fallback = 'Something went wrong. Please try again.'): string {
  if (!(error instanceof HttpErrorResponse)) return fallback;
  const body = error.error;
  if (typeof body === 'string') return body;
  if (body?.message) return body.message;
  if (body?.msg) return body.msg;
  if (body?.error) return body.error;
  if (error.status === 401) return 'Please log in to continue.';
  if (error.status === 403) return 'You are not allowed to perform this action.';
  if (error.status === 404) return 'The requested item was not found.';
  return fallback;
}
