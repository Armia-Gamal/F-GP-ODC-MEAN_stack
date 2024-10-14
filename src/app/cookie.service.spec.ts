import { TestBed } from '@angular/core/testing';

import { CookieCheckService } from './cookie.service';

describe('CookieService', () => {
  let service: CookieCheckService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CookieCheckService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
