import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserVerifyOtpComponent } from './user-verify-otp.component';

describe('UserVerifyOtpComponent', () => {
  let component: UserVerifyOtpComponent;
  let fixture: ComponentFixture<UserVerifyOtpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserVerifyOtpComponent]
    });
    fixture = TestBed.createComponent(UserVerifyOtpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
