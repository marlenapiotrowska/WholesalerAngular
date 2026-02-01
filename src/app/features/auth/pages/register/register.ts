import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../../core/services/user.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.html',
  styleUrl: './register.scss',
  imports: [CommonModule, FormsModule]
})
export class RegisterComponent {

  private userService = inject(UserService);
  private router = inject(Router);

  form = signal({ name: '', surname: '', role: '', login: '', password: '' });

  get user() {
    return this.userService.user();
  }

  async handleSubmit() {
    try {
      const res = await lastValueFrom(this.userService.register(this.form()));
      this.userService.setUser(res);
      this.router.navigate(['/']);
    } catch (error) {
      console.error('Register error:', error);
      alert('Błąd rejestracji!');
    }
  }
}
