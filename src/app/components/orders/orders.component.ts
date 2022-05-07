import { OrderService } from 'src/app/services/order.service';
import { Iorder } from 'src/app/models/iorder';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  order: Iorder[] = [];
  currentId: number = 0;
  constructor(
    private activateRoute: ActivatedRoute,
    private orderService: OrderService,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.orderService.getOrders().subscribe((ord) => {
      this.order = ord;
      for (let i of this.order) {
        console.log(i.orderAddress);
        console.log(i.estimatedDeliveryDate);
      }
    });
  }
}
