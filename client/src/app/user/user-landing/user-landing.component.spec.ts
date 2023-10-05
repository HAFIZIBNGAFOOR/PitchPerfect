import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLandingComponent } from './user-landing.component';

describe('UserLandingComponent', () => {
  let component: UserLandingComponent;
  let fixture: ComponentFixture<UserLandingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserLandingComponent]
    });
    fixture = TestBed.createComponent(UserLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
