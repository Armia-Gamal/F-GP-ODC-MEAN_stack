import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminregiserComponent } from './adminregiser.component';

describe('AdminregiserComponent', () => {
  let component: AdminregiserComponent;
  let fixture: ComponentFixture<AdminregiserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminregiserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminregiserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
