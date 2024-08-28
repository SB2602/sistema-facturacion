import { ComponentFixture, TestBed } from '@angular/core/testing';

import {SuppliersIndexComponent} from './suppliers-index.component';

describe('SuppliersIndexComponent', () => {
  let component: SuppliersIndexComponent;
  let fixture: ComponentFixture<SuppliersIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuppliersIndexComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SuppliersIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
