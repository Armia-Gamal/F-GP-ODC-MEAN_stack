
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 

  private isLoggedIn = false;

  logout() {
    this.isLoggedIn = false; 
    console.log('User logged out'); 
  }
}
