import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurfProfileComponent } from './turf-profile.component';

describe('TurfProfileComponent', () => {
  let component: TurfProfileComponent;
  let fixture: ComponentFixture<TurfProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TurfProfileComponent]
    });
    fixture = TestBed.createComponent(TurfProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
