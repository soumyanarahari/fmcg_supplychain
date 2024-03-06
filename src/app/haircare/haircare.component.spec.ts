import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HaircareComponent } from './haircare.component';

describe('HaircareComponent', () => {
  let component: HaircareComponent;
  let fixture: ComponentFixture<HaircareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HaircareComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HaircareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
