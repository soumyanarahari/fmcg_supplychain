import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaindashmanufacturerComponent } from './maindashmanufacturer.component';

describe('MaindashmanufacturerComponent', () => {
  let component: MaindashmanufacturerComponent;
  let fixture: ComponentFixture<MaindashmanufacturerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaindashmanufacturerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaindashmanufacturerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
