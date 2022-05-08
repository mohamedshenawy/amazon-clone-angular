import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDetalisComponent } from './order-detalis.component';

describe('OrderDetalisComponent', () => {
  let component: OrderDetalisComponent;
  let fixture: ComponentFixture<OrderDetalisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderDetalisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderDetalisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
