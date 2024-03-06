import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventssubscriptionComponent } from './eventssubscription.component';

describe('EventssubscriptionComponent', () => {
  let component: EventssubscriptionComponent;
  let fixture: ComponentFixture<EventssubscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventssubscriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventssubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
