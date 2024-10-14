
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CookieCheckService } from './cookie.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private cookieCheckService: CookieCheckService, private router: Router) {}

  canActivate(): boolean {
    if (this.cookieCheckService.isUserLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
