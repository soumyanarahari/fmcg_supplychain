import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManindasheventsComponent } from './manindashevents.component';

describe('ManindasheventsComponent', () => {
  let component: ManindasheventsComponent;
  let fixture: ComponentFixture<ManindasheventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManindasheventsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManindasheventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
