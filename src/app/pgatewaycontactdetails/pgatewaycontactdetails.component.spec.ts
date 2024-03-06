import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PgatewaycontactdetailsComponent } from './pgatewaycontactdetails.component';

describe('PgatewaycontactdetailsComponent', () => {
  let component: PgatewaycontactdetailsComponent;
  let fixture: ComponentFixture<PgatewaycontactdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PgatewaycontactdetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PgatewaycontactdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
