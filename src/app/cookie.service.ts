import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CookieCheckService {
  constructor(private cookieService: CookieService) {}

  isUserLoggedIn(): boolean {
    return this.cookieService.check('userEmail'); 
  }
}
