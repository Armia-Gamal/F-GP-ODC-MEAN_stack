import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    private apiUrl = 'http://localhost:3000/categories'; 

    constructor(private http: HttpClient) {}

    getAllCategories(): Observable<Category[]> {
        return this.http.get<Category[]>(this.apiUrl);
    }

    addCategory(category: Category, file: File): Observable<Category> {
        const formData = new FormData();
        formData.append('strCategory', category.strCategory);
        formData.append('strCategoryThumb', file);
        formData.append('strCategoryDescription', category.strCategoryDescription || '');
        formData.append('price', category.price.toString());
        formData.append('rate', category.rate?.toString() || '');

        return this.http.post<Category>(this.apiUrl, formData);
    }

    updateCategory(category: Category): Observable<Category> {
        return this.http.put<Category>(`${this.apiUrl}/${category.id}`, category);
    }

    deleteCategory(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
