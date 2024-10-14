import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PasswordGuard implements CanActivate {
  private predefinedPassword = 'Armia12345'; 

  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    const userInput = prompt('Please enter the password to continue:');

    if (userInput === null) {
      this.router.navigate(['/Home']);
      return false; 
    }

    if (userInput === this.predefinedPassword) {
      return true; 
    } else {
      alert('Incorrect password. Access denied.');
      this.router.navigate(['/']); 
      return false; 
    }
  }
}
