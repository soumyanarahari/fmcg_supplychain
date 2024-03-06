import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvtsubscriptionComponent } from './advtsubscription.component';

describe('AdvtsubscriptionComponent', () => {
  let component: AdvtsubscriptionComponent;
  let fixture: ComponentFixture<AdvtsubscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvtsubscriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvtsubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
