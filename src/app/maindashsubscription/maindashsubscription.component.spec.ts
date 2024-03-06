import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaindashsubscriptionComponent } from './maindashsubscription.component';

describe('MaindashsubscriptionComponent', () => {
  let component: MaindashsubscriptionComponent;
  let fixture: ComponentFixture<MaindashsubscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaindashsubscriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaindashsubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
