import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsuccessComponent } from './eventsuccess.component';

describe('EventsuccessComponent', () => {
  let component: EventsuccessComponent;
  let fixture: ComponentFixture<EventsuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventsuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
