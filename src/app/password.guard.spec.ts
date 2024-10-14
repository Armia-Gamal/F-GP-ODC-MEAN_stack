import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { PasswordGuard } from './password.guard'; 

describe('PasswordGuard', () => {
  let guard: PasswordGuard;
  let routerSpy = jasmine.createSpyObj('Router', ['navigate']); 

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PasswordGuard,
        { provide: Router, useValue: routerSpy }
      ]
    });
    guard = TestBed.inject(PasswordGuard); 
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should return true if the correct password is entered', () => {
    spyOn(window, 'prompt').and.returnValue('Armia12345'); 
    expect(guard.canActivate(null as any, null as any)).toBe(true);
  });

  it('should navigate to home if the password is incorrect', () => {
    spyOn(window, 'prompt').and.returnValue('wrongPassword'); 
    expect(guard.canActivate(null as any, null as any)).toBe(false);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
  });
});
