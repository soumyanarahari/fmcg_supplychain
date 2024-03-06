import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandlandingComponent } from './brandlanding.component';

describe('BrandlandingComponent', () => {
  let component: BrandlandingComponent;
  let fixture: ComponentFixture<BrandlandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrandlandingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandlandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
