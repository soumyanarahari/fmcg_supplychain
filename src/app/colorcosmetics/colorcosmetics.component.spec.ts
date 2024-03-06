import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorcosmeticsComponent } from './colorcosmetics.component';

describe('ColorcosmeticsComponent', () => {
  let component: ColorcosmeticsComponent;
  let fixture: ComponentFixture<ColorcosmeticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColorcosmeticsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorcosmeticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
