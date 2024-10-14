import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category.model';
import { CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie-service'; 

@Component({
    selector: 'app-update-category',
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule],
    templateUrl: './update-category.component.html',
    styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent implements OnInit {
    updateCategoryForm: FormGroup;
    categoryId: string | null = null;
    successMessage: string | null = null;
    errorMessage: string | null = null;
    thumbnailPreviewUrl: string | ArrayBuffer | null = null;
    thumbnailError: string | null = null;
    isAdmin: boolean = false; 
    baseUrl: string = 'http://localhost:3000/'; 

    constructor(
        private formBuilder: FormBuilder,
        private categoryService: CategoryService,
        private route: ActivatedRoute,
        private router: Router,
        private cookieService: CookieService 
    ) {
        this.updateCategoryForm = this.formBuilder.group({
            strCategory: ['', Validators.required],
            strCategoryThumb: [''],
            strCategoryDescription: [''],
            price: [0, [Validators.required, Validators.min(0)]],
            rate: [0, [Validators.min(0), Validators.max(5)]]
        });
    }

    ngOnInit(): void {
        this.checkAdminStatus(); 
        if (!this.isAdmin) {
            alert('You are not an admin. Access denied.');
            this.router.navigate(['/']); 
            return;
        }
        this.categoryId = this.route.snapshot.paramMap.get('id');
        this.loadCategory();
    }

    checkAdminStatus(): void {
        const adminEmail = this.cookieService.get('adminEmail');
        this.isAdmin = !!adminEmail; 
    }

    loadCategory(): void {
        this.categoryService.getAllCategories().subscribe(
            (categories) => {
                const category = categories.find(cat => cat._id === this.categoryId);
                if (category) {
                    this.updateCategoryForm.patchValue({
                        ...category,
                        strCategoryThumb: category.strCategoryThumb 
                    });
                    this.thumbnailPreviewUrl = `${this.baseUrl}${category.strCategoryThumb}`;
                } else {
                    this.errorMessage = 'Category not found.';
                }
            },
            (error) => {
                console.error('Error loading category:', error);
                this.errorMessage = 'Error loading category.';
            }
        );
    }
    
    onFileChange(event: Event): void {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
            const file = input.files[0];
            if (file.type.startsWith('image/')) {
                this.thumbnailError = null;
                const reader = new FileReader();
                reader.onload = () => {
                    this.thumbnailPreviewUrl = reader.result;
                };
                reader.readAsDataURL(file);
            } else {
                this.thumbnailError = 'Please select a valid image file.';
            }
        }
    }

    onUpdate(): void {
        if (this.updateCategoryForm.valid) {
            const updatedCategory = {
                ...this.updateCategoryForm.value,
                strCategoryThumb: this.updateCategoryForm.value.strCategoryThumb.replace('http://localhost:3000/', '') 
            };
            
            const category: Category = { id: this.categoryId, ...updatedCategory };
            this.categoryService.updateCategory(category).subscribe(
                () => {
                    this.successMessage = 'Category updated successfully.';
                },
                (error) => {
                    console.error('Error updating category:', error);
                    this.errorMessage = 'Error updating category.';
                }
            );
        }
    }
}
