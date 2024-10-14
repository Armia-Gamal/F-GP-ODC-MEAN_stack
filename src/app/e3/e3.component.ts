import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

interface Product {
  strCategoryThumb: string;
  price: number;
  rate: number;
  strCategory: string;
  strCategoryDescription: string;
  quantity?: number; 
}

@Component({
  selector: 'app-e3',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './e3.component.html',
  styleUrls: ['./e3.component.css']
})
export class E3Component implements OnInit {
  http = inject(HttpClient);
  router = inject(Router);
  cookieService = inject(CookieService);
  productsArray: Product[] = [];
  isUser: boolean = false; 

  fetchData() {
    this.http.get<Product[]>('http://localhost:3000/categories')
      .subscribe((response: Product[]) => {
        this.productsArray = response.map(product => ({
          ...product,
          strCategoryThumb: `http://localhost:3000/${product.strCategoryThumb}`,
          quantity: 1 
        }));
        console.log(this.productsArray);
      });
  }

  checkUserStatus(): void {
    const userEmail = this.cookieService.get('userEmail'); 
    this.isUser = !!userEmail; 
  }

  orderProduct(product: Product) {
    if (!this.isUser) {
      alert("You are not a user. Please register to place an order.");
      this.router.navigate(['/register']); 
      return;
    }

    const quantity = product.quantity || 1; 
    if (quantity < 1) {
      alert("Please enter a valid number for the order.");
      return;
    }

    alert(`Successfully ordered ${quantity} of ${product.strCategory}!`);
  }

  trackByFn(index: number, product: Product): number {
    return index; 
  }

  ngOnInit(): void {
    this.checkUserStatus(); 
    this.fetchData();
  }
}
