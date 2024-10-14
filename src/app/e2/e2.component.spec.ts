import { ComponentFixture, TestBed } from '@angular/core/testing';

import { E2Component } from './e2.component';

describe('E2Component', () => {
  let component: E2Component;
  let fixture: ComponentFixture<E2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [E2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(E2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
