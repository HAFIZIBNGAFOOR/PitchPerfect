import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentFailedComponent } from './payment-failed.component';

describe('PaymentFailedComponent', () => {
  let component: PaymentFailedComponent;
  let fixture: ComponentFixture<PaymentFailedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentFailedComponent]
    });
    fixture = TestBed.createComponent(PaymentFailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
