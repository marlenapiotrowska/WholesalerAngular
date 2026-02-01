import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss']
})
export class NavbarComponent {
  private userService = inject(UserService);
  private router = inject(Router);

  // getter dla template
  get user() {
    return this.userService.user();
  }

  logout() {
    this.userService.logout();
  }

  go(path: string) {
    this.router.navigate([path]);
  }
}
