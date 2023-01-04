import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPoeComponent } from './list.component';

describe('ListPoeComponent', () => {
  let component: ListPoeComponent;
  let fixture: ComponentFixture<ListPoeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPoeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPoeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
