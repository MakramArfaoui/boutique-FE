import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(form: NgForm) {
    this.authService.login(this.email, this.password).subscribe(success => {
      console.log('Login result:', success);
      if (success) {
        this.router.navigate(['/produits']);
      } else {
        alert('Login failed. Please try again.');
      }
    });
  }
}
