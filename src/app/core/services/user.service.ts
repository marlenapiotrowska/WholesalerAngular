import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

export interface User {
  name: string;
  token: string;
  isLoggedIn: boolean;
}

export interface Employee {
  id: number;
  name: string;
  role: string;
}

@Injectable({ providedIn: 'root' })
export class UserService {
  private apiUrl = 'http://localhost:5050';

  user = signal<User>({ name: '', token: '', isLoggedIn: false });

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: { login: string; password: string }): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/users/actions/login`, credentials);
  }

  register(data: { name: string; surname: string; role: string; login: string; password: string;  }): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/users`, data);
  }

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiUrl}/employees`);
  }

  setUser(userData: User) {
    this.user.set({...userData, isLoggedIn: true});
  }

  logout() {
    this.user.set({ name: '', token: '', isLoggedIn: false });
    this.router.navigate(['/login']);
  }
}
