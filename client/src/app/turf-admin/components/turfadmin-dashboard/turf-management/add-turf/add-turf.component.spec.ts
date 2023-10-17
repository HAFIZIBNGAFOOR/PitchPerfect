import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTurfComponent } from './add-turf.component';

describe('AddTurfComponent', () => {
  let component: AddTurfComponent;
  let fixture: ComponentFixture<AddTurfComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddTurfComponent]
    });
    fixture = TestBed.createComponent(AddTurfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
