import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationMapComponent } from './navigation-map.component';

describe('NavigationMapComponent', () => {
  let component: NavigationMapComponent;
  let fixture: ComponentFixture<NavigationMapComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavigationMapComponent]
    });
    fixture = TestBed.createComponent(NavigationMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
