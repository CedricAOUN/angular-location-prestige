import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarlistComponent } from './carlist.component';

describe('CarlistComponent', () => {
  let component: CarlistComponent;
  let fixture: ComponentFixture<CarlistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarlistComponent]
    });
    fixture = TestBed.createComponent(CarlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
