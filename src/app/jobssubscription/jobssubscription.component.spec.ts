import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobssubscriptionComponent } from './jobssubscription.component';

describe('JobssubscriptionComponent', () => {
  let component: JobssubscriptionComponent;
  let fixture: ComponentFixture<JobssubscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobssubscriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobssubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
