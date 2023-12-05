import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurfadminLoginComponent } from './turfadmin-login.component';

describe('TurfadminLoginComponent', () => {
  let component: TurfadminLoginComponent;
  let fixture: ComponentFixture<TurfadminLoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TurfadminLoginComponent]
    });
    fixture = TestBed.createComponent(TurfadminLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
