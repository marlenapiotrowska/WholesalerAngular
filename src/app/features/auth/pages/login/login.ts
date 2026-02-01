import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../../core/services/user.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class LoginComponent {
  private userService = inject(UserService);
  private router = inject(Router);

  // formularz jako signal
  form = signal({ login: '', password: '' });

  // getter dla wygody w template
  get user() {
    return this.userService.user();
  }

  async handleSubmit() {
    try {
      // konwertujemy Observable na Promise
      const res = await lastValueFrom(this.userService.login(this.form()));
      this.userService.setUser(res);
      this.router.navigate(['/']); // redirect po zalogowaniu
    } catch (error) {
      console.error('Login error:', error);
      alert('Błąd logowania!');
    }
  }
}
