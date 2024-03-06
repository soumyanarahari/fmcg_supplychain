import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManindashleadsComponent } from './manindashleads.component';

describe('ManindashleadsComponent', () => {
  let component: ManindashleadsComponent;
  let fixture: ComponentFixture<ManindashleadsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManindashleadsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManindashleadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
