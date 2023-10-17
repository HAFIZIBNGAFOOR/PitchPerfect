import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IsBlockedComponent } from './is-blocked.component';

describe('IsBlockedComponent', () => {
  let component: IsBlockedComponent;
  let fixture: ComponentFixture<IsBlockedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IsBlockedComponent]
    });
    fixture = TestBed.createComponent(IsBlockedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
