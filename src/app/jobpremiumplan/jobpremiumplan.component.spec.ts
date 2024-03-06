import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobpremiumplanComponent } from './jobpremiumplan.component';

describe('JobpremiumplanComponent', () => {
  let component: JobpremiumplanComponent;
  let fixture: ComponentFixture<JobpremiumplanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobpremiumplanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobpremiumplanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
