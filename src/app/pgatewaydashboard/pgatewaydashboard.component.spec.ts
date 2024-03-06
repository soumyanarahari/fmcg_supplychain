import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PgatewaydashboardComponent } from './pgatewaydashboard.component';

describe('PgatewaydashboardComponent', () => {
  let component: PgatewaydashboardComponent;
  let fixture: ComponentFixture<PgatewaydashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PgatewaydashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PgatewaydashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
