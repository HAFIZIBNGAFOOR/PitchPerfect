import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurfAdminManagementComponent } from './turf-admin-management.component';

describe('TurfAdminManagementComponent', () => {
  let component: TurfAdminManagementComponent;
  let fixture: ComponentFixture<TurfAdminManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TurfAdminManagementComponent]
    });
    fixture = TestBed.createComponent(TurfAdminManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
