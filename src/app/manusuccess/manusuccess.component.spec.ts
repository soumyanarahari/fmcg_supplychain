import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManusuccessComponent } from './manusuccess.component';

describe('ManusuccessComponent', () => {
  let component: ManusuccessComponent;
  let fixture: ComponentFixture<ManusuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManusuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManusuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
