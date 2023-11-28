import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingsManagementComponent } from './bookings-management.component';

describe('BookingsManagementComponent', () => {
  let component: BookingsManagementComponent;
  let fixture: ComponentFixture<BookingsManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookingsManagementComponent]
    });
    fixture = TestBed.createComponent(BookingsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
