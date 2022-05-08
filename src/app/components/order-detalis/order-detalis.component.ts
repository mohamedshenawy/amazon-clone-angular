import { leadingComment } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { IorderProduct } from 'src/app/models/iorder-product';
import { Iorderdetails } from 'src/app/models/iorderdetails';
import { Iproduct } from 'src/app/models/iproduct';
import { OrderService } from 'src/app/services/order.service';
import { ProductsService } from 'src/app/services/products.service';
import { OrdersComponent } from '../orders/orders.component';

@Component({
  selector: 'app-order-detalis',
  templateUrl: './order-detalis.component.html',
  styleUrls: ['./order-detalis.component.scss'],
})
export class OrderDetalisComponent implements OnInit {
  currentId: number = 0;
  orderProdIdAndQty: Iorderdetails[] = [];
  orderProducts: Iproduct[] = [];
  currentLang: string = '';
  constructor(
    private activateRoute: ActivatedRoute,
    private orderService: OrderService,
    private productsService: ProductsService,
    public translate: TranslateService
  ) {
    this.currentLang = localStorage.getItem('currentLang') || 'en';
    this.translate.use(this.currentLang);
  }

  ngOnInit(): void {
    this.activateRoute.paramMap.subscribe((paramMap) => {
      this.currentId = paramMap.get('id')
        ? Number(this.activateRoute.snapshot.paramMap.get('id'))
        : 0;
      this.orderService.getOrderDetails(this.currentId).subscribe({
        next: (p) => {
          for (let i of p[0]) {
            this.orderProdIdAndQty.push(i);
          }
          this.getproducts();
          //console.log(this.orderProdIdAndQty);
        },
      });
    });
    // this.addQuantity();
    // console.log(this.orderProducts);
  }

  getproducts() {
    for (let i of this.orderProdIdAndQty) {
      this.productsService.getProductsById(i.productId).subscribe({
        next: (p) => {
          this.orderProducts.push(p);
        },
      });
    }
    //console.log(this.orderProducts);
  }

  // addQuantity() {
  //   for (let ordr of this.orderProdIdAndQty) {
  //     for (let prd of this.orderProducts) {
  //       if (ordr.productId == prd.id) {
  //         prd.stoke = ordr.quantity;
  //       } else {
  //         console.log(ordr.quantity + '' + prd.stoke);
  //       }
  //     }
  //   }
  // }
}
