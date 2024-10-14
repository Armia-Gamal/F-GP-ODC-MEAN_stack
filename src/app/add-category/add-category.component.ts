import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service'; 
import { Router } from '@angular/router'; 

@Component({
    selector: 'app-add-category',
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
    templateUrl: './add-category.component.html',
    styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent {
    addCategoryForm: FormGroup;
    successMessage: string = '';
    errorMessage: string = '';
    thumbnailFile: File | null = null;
    thumbnailPreviewUrl: string | null = null; 
    thumbnailError: string | null = null; 
    isAdmin: boolean = false; 
    email: string = ''; 

    constructor(private fb: FormBuilder, private http: HttpClient, private cookieService: CookieService, private router: Router) {
        this.addCategoryForm = this.fb.group({
            strCategory: ['', Validators.required],
            strCategoryDescription: [''],
            price: [null, [Validators.required, Validators.min(0)]],
            rate: [null, [Validators.min(0), Validators.max(5)]]
        });

        this.checkAdminStatus(); 
    }

    checkAdminStatus(): void {
        const userEmail = this.cookieService.get('userEmail');
        const adminEmail = this.cookieService.get('adminEmail'); 

        if (userEmail) {
            this.email = userEmail; 
            this.isAdmin = false; 
        } else if (adminEmail) {
            this.email = adminEmail; 
            this.isAdmin = true; 
        }

        if (!this.isAdmin) {
            alert('You are not an admin. Access denied.');
            this.router.navigate(['/']); 
        }
    }

    onFileChange(event: any) {
        this.thumbnailError = null;

        const file = event.target.files[0];
        if (file) {
            const fileType = file.type;
            const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
            if (validImageTypes.includes(fileType)) {
                this.thumbnailFile = file;

                const reader = new FileReader();
                reader.onload = (e: any) => {
                    this.thumbnailPreviewUrl = e.target.result; 
                };
                reader.readAsDataURL(file); 
            } else {
                this.thumbnailError = 'Please select a valid image file (JPEG, PNG, GIF).';
                this.thumbnailFile = null;
            }
        }
    }

    onSubmit() {
        this.successMessage = ''; 
        this.errorMessage = ''; 

        if (this.addCategoryForm.valid && this.thumbnailFile) {
            const formData = new FormData();
            const categoryData = this.addCategoryForm.value;

            formData.append('strCategory', categoryData.strCategory);
            formData.append('strCategoryDescription', categoryData.strCategoryDescription);
            formData.append('price', categoryData.price);
            formData.append('rate', categoryData.rate);
            formData.append('strCategoryThumb', this.thumbnailFile); 

            this.http.post<any>('http://localhost:3000/categories', formData).subscribe(
                (response: any) => {
                    console.log('Category added successfully:', response);
                    this.successMessage = 'Category added successfully!'; 
                    this.addCategoryForm.reset(); 
                    this.thumbnailFile = null; 
                    this.thumbnailPreviewUrl = null; 

                    setTimeout(() => {
                        this.successMessage = '';
                    }, 5000);
                },
                (error: HttpErrorResponse) => {
                    console.error('Error adding category:', error);
                    this.errorMessage = 'Failed to add category. Please try again.'; 

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
