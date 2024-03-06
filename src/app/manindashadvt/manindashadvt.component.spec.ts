import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManindashadvtComponent } from './manindashadvt.component';

describe('ManindashadvtComponent', () => {
  let component: ManindashadvtComponent;
  let fixture: ComponentFixture<ManindashadvtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManindashadvtComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManindashadvtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
