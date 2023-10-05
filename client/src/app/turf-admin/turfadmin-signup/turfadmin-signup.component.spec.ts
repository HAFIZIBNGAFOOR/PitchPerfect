import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurfadminSignupComponent } from './turfadmin-signup.component';

describe('TurfadminSignupComponent', () => {
  let component: TurfadminSignupComponent;
  let fixture: ComponentFixture<TurfadminSignupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TurfadminSignupComponent]
    });
    fixture = TestBed.createComponent(TurfadminSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
