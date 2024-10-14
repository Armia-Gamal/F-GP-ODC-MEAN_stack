import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-e5',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, CommonModule],
  templateUrl: './e5.component.html',
  styleUrls: ['./e5.component.css']
})
export class E5Component implements OnInit {
  contactForm: FormGroup;
  successMessage: string = '';  
  errorMessage: string = '';    
  isUser: boolean = false; 

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private cookieService: CookieService, 
    private router: Router
  ) {
    this.contactForm = this.fb.group({
      Name: ['', Validators.required],     
      Email: ['', [Validators.required, Validators.email]],    
      Subject: ['', Validators.required],  
      Message: ['', Validators.required]   
    });

    this.checkUserStatus(); 
  }

  checkUserStatus(): void {
    const userEmail = this.cookieService.get('userEmail'); 
    this.isUser = !!userEmail; 
  }

  fetchData(event: Event) {
    event.preventDefault(); 

    if (!this.isUser) {
      alert('You must be a registered user to send a message.');
      this.router.navigate(['/login']); 
      return;
    }

    if (this.contactForm.invalid) {
      this.errorMessage = 'Please fill in all fields correctly.'; 
      return;
    }

    const formData = this.contactForm.value;
    console.log('Submitting form data:', formData);

    this.http.post<any>('http://localhost:3000/contact', formData).subscribe(
      (data: any) => {
        console.log('Form submitted successfully:', data);
        this.successMessage = 'Your message has been sent successfully!'; 
        this.contactForm.reset(); 
        this.errorMessage = ''; 
        setTimeout(() => this.successMessage = '', 5000);
      },
      (error: any) => {
        console.log('Error occurred:', error);
        this.errorMessage = 'An error occurred while sending your message. Please try again.'; 
        this.successMessage = ''; 
      }
    );
  }

  ngOnInit(): void {}
}
