import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BallSpinnerComponent } from './ball-spinner.component';

describe('BallSpinnerComponent', () => {
  let component: BallSpinnerComponent;
  let fixture: ComponentFixture<BallSpinnerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BallSpinnerComponent]
    });
    fixture = TestBed.createComponent(BallSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
