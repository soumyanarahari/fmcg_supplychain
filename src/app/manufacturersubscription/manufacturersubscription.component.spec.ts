import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManufacturersubscriptionComponent } from './manufacturersubscription.component';

describe('ManufacturersubscriptionComponent', () => {
  let component: ManufacturersubscriptionComponent;
  let fixture: ComponentFixture<ManufacturersubscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManufacturersubscriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManufacturersubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
