
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../auth.service'; 

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  email: string = ''; 
  isAdmin: boolean = false; 
  isMenuVisible = false;

  constructor(private cookieService: CookieService, private authService: AuthService) {
    const userEmail = this.cookieService.get('userEmail');
    const adminEmail = this.cookieService.get('adminEmail'); 

    if (userEmail) {
      this.email = userEmail; 
      this.isAdmin = false; 
    } else if (adminEmail) {
      this.email = adminEmail; 
      this.isAdmin = true; 
    }
  }

  toggleMenu() {
    this.isMenuVisible = !this.isMenuVisible;
  }

  hideMenu() {
    this.isMenuVisible = false;
  }

  keepMenuOpen() {
    this.isMenuVisible = true;
  }

  logout() {
    this.cookieService.delete('userEmail'); 
    this.email = ''; 
    this.isAdmin = false; 
    this.authService.logout(); 
    console.log('Logged out successfully');
  }

  logoutAdmin() {
    this.cookieService.delete('adminEmail'); 
    this.email = ''; 
    this.isAdmin = false; 
    this.authService.logout(); 
    console.log('Logged out Admin successfully');
  }
}
