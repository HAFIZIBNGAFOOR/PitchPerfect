import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeSlotsComponent } from './change-slots.component';

describe('ChangeSlotsComponent', () => {
  let component: ChangeSlotsComponent;
  let fixture: ComponentFixture<ChangeSlotsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChangeSlotsComponent]
    });
    fixture = TestBed.createComponent(ChangeSlotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
