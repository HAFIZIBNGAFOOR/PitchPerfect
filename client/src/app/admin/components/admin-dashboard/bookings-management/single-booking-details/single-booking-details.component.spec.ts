import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleBookingDetailsComponent } from './single-booking-details.component';

describe('SingleBookingDetailsComponent', () => {
  let component: SingleBookingDetailsComponent;
  let fixture: ComponentFixture<SingleBookingDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SingleBookingDetailsComponent]
    });
    fixture = TestBed.createComponent(SingleBookingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
