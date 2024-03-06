import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdlandingComponent } from './adlanding.component';

describe('AdlandingComponent', () => {
  let component: AdlandingComponent;
  let fixture: ComponentFixture<AdlandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdlandingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdlandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
