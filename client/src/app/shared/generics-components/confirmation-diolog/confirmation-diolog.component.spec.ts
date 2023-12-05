import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationDiologComponent } from './confirmation-diolog.component';

describe('ConfirmationDiologComponent', () => {
  let component: ConfirmationDiologComponent;
  let fixture: ComponentFixture<ConfirmationDiologComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmationDiologComponent]
    });
    fixture = TestBed.createComponent(ConfirmationDiologComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
