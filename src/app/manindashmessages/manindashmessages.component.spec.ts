import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManindashmessagesComponent } from './manindashmessages.component';

describe('ManindashmessagesComponent', () => {
  let component: ManindashmessagesComponent;
  let fixture: ComponentFixture<ManindashmessagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManindashmessagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManindashmessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
