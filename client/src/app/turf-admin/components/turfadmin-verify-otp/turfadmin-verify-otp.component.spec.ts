import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurfadminVerifyOtpComponent } from './turfadmin-verify-otp.component';

describe('TurfadminVerifyOtpComponent', () => {
  let component: TurfadminVerifyOtpComponent;
  let fixture: ComponentFixture<TurfadminVerifyOtpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TurfadminVerifyOtpComponent]
    });
    fixture = TestBed.createComponent(TurfadminVerifyOtpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
