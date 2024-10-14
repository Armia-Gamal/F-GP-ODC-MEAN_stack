import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CategoryService } from './../services/category.service'; 
import { CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie-service'; 
import { AuthService } from '../auth.service'; 


interface Product {
  strCategoryThumb: string;
  price: number;
  rate: number;
  strCategory: string;
  strCategoryDescription: string;
}

@Component({
  selector: 'app-category-management',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './category-management.component.html',
  styleUrls: ['./category-management.component.css']
})
export class CategoryManagementComponent {
  http = inject(HttpClient);
  categoryService = inject(CategoryService);
  cookieService = inject(CookieService); 
  authService = inject(AuthService); 
  constructor(private router: Router) {}

  productsArray: any[] = [];
  randomNumber: number | null = null; 
  isAdmin: boolean = false; 
  email: string = ''; 

  ngOnInit(): void {
    this.checkAdminStatus(); 
    this.fetchData(); 
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


  fetchData() {
    this.http.get<Product[]>('http://localhost:3000/categories')
      .subscribe((response: Product[]) => {
        this.productsArray = response.map(product => ({
          ...product,
          strCategoryThumb: `http://localhost:3000/${product.strCategoryThumb}` 
        }));
        console.log(this.productsArray); 
      });
  }
  generateRandomNumber() {
    this.randomNumber = Math.floor(Math.random() * (20 - 10 + 1)) + 10;
  }

  deleteCategory(id: string): void {
    if (confirm('Are you sure you want to delete this category?')) {
      this.categoryService.deleteCategory(id).subscribe(() => {
        this.productsArray = this.productsArray.filter(product => product._id !== id);
        alert('Category deleted successfully!');
      }, error => {
        console.error('An error occurred while deleting:', error);
        alert('The category could not be deleted. Please try again.');
      });
    }
  }

  navigateToUpdate(categoryId: string) {
    this.router.navigate(['update-category', categoryId]);
  }
}
