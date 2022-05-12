import { OrderService } from 'src/app/services/order.service';
import { Iorder } from 'src/app/models/iorder';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Iorderdetails } from 'src/app/models/iorderdetails';
import { ProductsService } from 'src/app/services/products.service';
import { Iproduct } from 'src/app/models/iproduct';
import { OrderDetalisComponent } from '../order-detalis/order-detalis.component';

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
    private location: Location,
    private productsService: ProductsService
  ) { }

  ngOnInit(): void {
    this.orderService.getOrders().subscribe((ord) => {
      this.order = ord;
    });
  }

  // orderProdIdAndQty!: Iorderdetails[];
  orderDetalis(orderId: number) {
    this.router.navigate(['orderDetails/', orderId]);
  }
  // orderProducts: Iproduct[] = [];
  // //@ViewChild(OrderDetalisComponent) orderDetalisRef!: OrderDetalisComponent;
  // getproducts() {
  //   for (let i of this.orderProdIdAndQty) {
  //     this.productsService.getProductsById(i.productId).subscribe({
  //       next: (p) => {
  //         this.orderProducts.push(p);
  //         //this.orderDetalisRef.orderProds.push(p);
  //       },
  //     });
  //   }
  //   console.log(this.orderProducts);
  //   //console.log(this.orderDetalisRef);
  // }
}
