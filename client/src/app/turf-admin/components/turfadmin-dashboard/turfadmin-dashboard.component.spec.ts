import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurfadminDashboardComponent } from './turfadmin-dashboard.component';

describe('TurfadminDashboardComponent', () => {
  let component: TurfadminDashboardComponent;
  let fixture: ComponentFixture<TurfadminDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TurfadminDashboardComponent]
    });
    fixture = TestBed.createComponent(TurfadminDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
