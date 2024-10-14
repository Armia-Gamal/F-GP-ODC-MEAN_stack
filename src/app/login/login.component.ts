import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';
  
  constructor(private fb: FormBuilder, private http: HttpClient, private cookieService: CookieService, private router: Router) { 
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {
    this.successMessage = ''; 
    this.errorMessage = ''; 

    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;
      console.log('Login data:', loginData);

      this.http.post<any>('http://localhost:3000/users/login', loginData, { withCredentials: true }).subscribe(
        (response: any) => {
          console.log('Login successful:', response);
          this.successMessage = 'Login successful!'; 

          this.cookieService.set('userEmail', loginData.email); 

          this.router.navigate(['/home']).then(() => {
            window.location.reload(); 
          });
          setTimeout(() => {
            this.successMessage = '';
          }, 5000);
        },
        (error: HttpErrorResponse) => {
          console.error('Login error:', error);
          if (error.status === 401) {
            this.errorMessage = 'Invalid email or password. Please try again.'; 
          } else {
            this.errorMessage = 'Login failed. Please try again.'; 
          }
          setTimeout(() => {
            this.errorMessage = '';
          }, 5000);
        }
      );
    } else {
      this.errorMessage = 'Please fill out all required fields.'; 
      console.log('Form is invalid');

      setTimeout(() => {
        this.errorMessage = '';
      }, 5000);
    }
  }

  logout() {
    this.cookieService.delete('userEmail'); 
    console.log('Logged out successfully');
  }
}
