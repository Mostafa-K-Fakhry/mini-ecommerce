import { Injectable, computed, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { API_BASE_URL } from '../core/api.config';
import { AuthResponse, User } from '../models/user.model';

const TOKEN_KEY = 'mini-ecommerce-token';
const USER_KEY = 'mini-ecommerce-user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly userState = signal<User | null>(this.restoreUser());
  readonly user = this.userState.asReadonly();
  readonly loggedIn = computed(() => !!this.userState());

  constructor(private readonly http: HttpClient) {}

  register(payload: { name: string; email: string; password: string; confirmpassword: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${API_BASE_URL}/auth/register`, payload).pipe(tap((response) => this.persist(response)));
  }

  login(payload: { email: string; password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${API_BASE_URL}/auth/login`, payload).pipe(tap((response) => this.persist(response)));
  }

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    this.userState.set(null);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(TOKEN_KEY);
  }

  isAdmin(): boolean {
    return this.userState()?.role === 'admin';
  }

  private persist(response: AuthResponse): void {
    const decoded = this.decodeToken(response.token);
    const source = response.user ?? response.newuser;
    const user: User = {
      _id: source?._id ?? decoded?.id,
      name: source?.name ?? decoded?.name ?? 'Account',
      email: source?.email,
      role: decoded?.role === 'admin' || source?.role === 'admin' ? 'admin' : 'user',
    };
    localStorage.setItem(TOKEN_KEY, response.token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    this.userState.set(user);
  }

  private restoreUser(): User | null {
    try {
      const saved = localStorage.getItem(USER_KEY);
      if (saved) return JSON.parse(saved) as User;
      const token = localStorage.getItem(TOKEN_KEY);
      const decoded = token ? this.decodeToken(token) : null;
      return decoded ? { _id: decoded.id, name: decoded.name ?? 'Account', role: decoded.role === 'admin' ? 'admin' : 'user' } : null;
    } catch {
      return null;
    }
  }

  private decodeToken(token: string): { id?: string; name?: string; role?: string } | null {
    try {
      return JSON.parse(atob(token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')));
    } catch {
      return null;
    }
  }
}
