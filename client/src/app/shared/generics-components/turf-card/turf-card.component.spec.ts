import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurfCardComponent } from './turf-card.component';

describe('TurfCardComponent', () => {
  let component: TurfCardComponent;
  let fixture: ComponentFixture<TurfCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TurfCardComponent]
    });
    fixture = TestBed.createComponent(TurfCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
