import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapDiologComponent } from './map-diolog.component';

describe('MapDiologComponent', () => {
  let component: MapDiologComponent;
  let fixture: ComponentFixture<MapDiologComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MapDiologComponent]
    });
    fixture = TestBed.createComponent(MapDiologComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
