import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurfDetailsComponent } from './turf-details.component';

describe('TurfDetailsComponent', () => {
  let component: TurfDetailsComponent;
  let fixture: ComponentFixture<TurfDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TurfDetailsComponent]
    });
    fixture = TestBed.createComponent(TurfDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
