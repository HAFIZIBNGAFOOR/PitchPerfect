import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurfWalletComponent } from './turf-wallet.component';

describe('TurfWalletComponent', () => {
  let component: TurfWalletComponent;
  let fixture: ComponentFixture<TurfWalletComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TurfWalletComponent]
    });
    fixture = TestBed.createComponent(TurfWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
