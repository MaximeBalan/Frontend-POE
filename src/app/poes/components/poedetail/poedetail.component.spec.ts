import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoedetailComponent } from './poedetail.component';

describe('PoedetailComponent', () => {
  let component: PoedetailComponent;
  let fixture: ComponentFixture<PoedetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoedetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoedetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
