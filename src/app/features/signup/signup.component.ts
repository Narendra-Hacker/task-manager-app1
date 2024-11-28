import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/User';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  user : User = { id:0,name: '', phoneNo:'', email: '',password:'' };
  constructor(private userService: UserService, private router: Router) { }
  onSignup() {
    this.userService.addUser(this.user);
    alert('Sign up successful');
    this.router.navigate(['/']);
  }
}

