import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSlotComponent } from './add-slot.component';

describe('AddSlotComponent', () => {
  let component: AddSlotComponent;
  let fixture: ComponentFixture<AddSlotComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddSlotComponent]
    });
    fixture = TestBed.createComponent(AddSlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
