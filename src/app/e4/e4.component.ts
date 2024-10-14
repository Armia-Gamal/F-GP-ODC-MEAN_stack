import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

interface BookingData {
  date: string;
  time: string;
  name: string;
  phone: string;
  totalPerson: number;
}

@Component({
  selector: 'app-e4',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './e4.component.html',
  styleUrls: ['./e4.component.css']
})
export class E4Component {
  bookingForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;
  isUser: boolean = false; 

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private cookieService: CookieService, 
    private router: Router
  ) {
    this.bookingForm = this.fb.group({
      date: ['', Validators.required],
      time: ['', Validators.required],
      name: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^\d{6,10}$/)]],
      totalPerson: ['', Validators.required]
    });

    this.checkUserStatus(); 
  }

  checkUserStatus(): void {
    const userEmail = this.cookieService.get('userEmail'); 
    this.isUser = !!userEmail; 
  }

  bookTable() {
    if (!this.isUser) {
      alert('You must be a registered user to book a table.');
      this.router.navigate(['/login']); 
      return;
    }

    if (this.bookingForm.invalid) {
      console.error('Form is invalid:', this.bookingForm.errors);
      this.errorMessage = 'Please fill in all fields correctly.';
      return;
    }

    const inputDate = this.bookingForm.value.date;
    if (!inputDate) {
      this.errorMessage = 'Date cannot be empty.';
      return;
    }

    const dateObject = new Date(inputDate);
    if (isNaN(dateObject.getTime())) {
      this.errorMessage = 'Date must be a valid date.';
      return;
    }

    const formattedDate = dateObject.toISOString();
    console.log('Formatted Date:', formattedDate);

    const bookingData: BookingData = {
      ...this.bookingForm.value,
      date: formattedDate,
      totalPerson: Number(this.bookingForm.value.totalPerson)
    };

    console.log('Booking Data:', bookingData);

    this.http.post<any>('http://localhost:3000/bookTable', bookingData).subscribe(
      (response) => {
        console.log('Table booked successfully:', response);
        this.successMessage = 'Your table has been booked successfully!';
        this.bookingForm.reset();
        this.errorMessage = '';
        setTimeout(() => this.successMessage = '', 5000);
      },
      (error) => {
        console.error('Error occurred while booking table:', error);
        this.errorMessage = 'An error occurred while booking your table. Please try again.';
        this.successMessage = '';
      }
    );
  }
}
