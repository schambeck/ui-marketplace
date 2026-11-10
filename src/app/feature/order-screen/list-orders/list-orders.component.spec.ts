import {ComponentFixture, TestBed} from '@angular/core/testing';
import {CommonModule} from '@angular/common';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {of} from 'rxjs';
import {Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {OrderService} from '../../../shared/service/order.service';
import {ListOrdersComponent} from './list-orders.component';

describe('ListOrdersComponent', () => {
  let component: ListOrdersComponent;
  let fixture: ComponentFixture<ListOrdersComponent>;
  const orderService = {list: jasmine.createSpy('list').and.returnValue(of({content: [], size: 20, totalElements: 0}))};
  const router = {navigate: jasmine.createSpy('navigate')};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListOrdersComponent],
      imports: [CommonModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {provide: OrderService, useValue: orderService},
        {provide: Router, useValue: router},
        {provide: Title, useValue: {setTitle: jasmine.createSpy('setTitle')}}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ListOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('loads the first page on initialization', () => {
    expect(orderService.list).toHaveBeenCalledWith(0, 20);
    expect(component.totalElements).toBe(0);
  });

  it('navigates to the order detail', () => {
    component.open({publicId: 'order-1', status: 'CREATED', subtotalAmount: 10, totalAmount: 10});
    expect(router.navigate).toHaveBeenCalledWith(['/orders', 'order-1']);
  });
});
