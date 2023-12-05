import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurfManagementComponent } from './turf-management.component';

describe('TurfManagementComponent', () => {
  let component: TurfManagementComponent;
  let fixture: ComponentFixture<TurfManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TurfManagementComponent]
    });
    fixture = TestBed.createComponent(TurfManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
