import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent {
  constructor(private router: Router, private userService : UserService) { }

  logout() {
    this.router.navigate(['/login']);
    this.userService.logout();
  }
}