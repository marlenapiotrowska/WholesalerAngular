import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, throwError, delay } from 'rxjs';

export interface User {
  name: string;
  token: string;
  isLoggedIn: boolean;
}

@Injectable({ providedIn: 'root' })
export class UserService {
  user = signal<User>({ name: '', token: '', isLoggedIn: false });

  constructor(private router: Router) {}

  login(credentials: { login: string; password: string }): Observable<User> {
    if (credentials.login === 'admin' && credentials.password === '1234') {
      return of({
        name: 'Admin',
        token: 'fake-jwt-token',
        isLoggedIn: true
      }).pipe(delay(500)); // symulacja opóźnienia API
    } else {
      return throwError(() => new Error('Nieprawidłowy login lub hasło')).pipe(delay(500));
    }
  }

  setUser(userData: User) {
    this.user.set(userData);
  }

  logout() {
    this.user.set({ name: '', token: '', isLoggedIn: false });
    this.router.navigate(['/login']);
  }
}
