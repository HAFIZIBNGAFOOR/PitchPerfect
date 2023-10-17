import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookTurfComponent } from './book-turf.component';

describe('BookTurfComponent', () => {
  let component: BookTurfComponent;
  let fixture: ComponentFixture<BookTurfComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookTurfComponent]
    });
    fixture = TestBed.createComponent(BookTurfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
