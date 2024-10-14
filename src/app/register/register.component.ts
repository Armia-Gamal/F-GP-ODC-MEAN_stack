import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';  
import { HttpErrorResponse } from '@angular/common/http'; 
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,HttpClientModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  signUpForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.signUpForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      gender: ['', Validators.required],
      address: ['', Validators.required]
    });
  }

  onSubmit() {
    this.successMessage = ''; 
    this.errorMessage = ''; 

    if (this.signUpForm.valid) {
        const userData = this.signUpForm.value;
        console.log('User data:', userData);
        
        
        this.http.post<any>('http://localhost:3000/users/register', userData).subscribe(
            (response: any) => {
                console.log('Registration successful:', response);
                this.successMessage = response.message; 
                this.signUpForm.reset(); 

                setTimeout(() => {
                    this.successMessage = '';
                }, 5000);
            },
            (error: HttpErrorResponse) => {
                console.error('Registration error:', error);
                if (error.status === 400) {
                    if (error.error.message.includes('Email already exists')) {
                        this.errorMessage = 'Email already exists. Please use a different email.';
                    } else if (error.error.message.includes('Phone number already exists')) {
                        this.errorMessage = 'Phone number already exists. Please use a different number.';
                    } else {
                        this.errorMessage = 'Registration failed. Please try again.';
                    }
                } else {
                    this.errorMessage = 'Registration failed. Please try again.'; 
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
  
}
