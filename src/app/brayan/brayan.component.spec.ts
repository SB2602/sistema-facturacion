import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrayanComponent } from './brayan.component';

describe('BrayanComponent', () => {
  let component: BrayanComponent;
  let fixture: ComponentFixture<BrayanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrayanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrayanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
