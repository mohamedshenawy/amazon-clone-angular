import { Iproduct } from 'src/app/models/iproduct';
import { CartServiceService } from './../../services/cart-service.service';
import { Component, OnInit } from '@angular/core';
import { render } from 'creditcardpayments/creditCardPayments';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/models/icustomer';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Iorder } from 'src/app/models/iorder';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  Delivery: number = 5;
  public products: any = [];
  public TotalItem: number = 0;
  showOrderMaker: boolean = false;
  orderDate = new Date();
  estimatedDelevryDate = new Date();
  httoOptions = {};

  user!: IUser;
  constructor(
    private cartService: CartServiceService,
    private route: Router,
    private HttpClient: HttpClient,
    private orderService: OrderService
  ) {
    this.httoOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }),
    };
    this.cartService.cartSubject.subscribe((data) => {
      this.TotalItem = data;
    });

    render({
      id: '#myPaypalButtons',
      currency: 'USD',
      value: '100.00',
      onApprove: (details) => {
        alert('Transaction Successfully');
      },
    });
  }

  ngOnInit(): void {
    // this.cartService.getProducts().subscribe(res => {
    //   this.products = res;
    //   this.TotalItem = res.length;
    // this.TotalPrice = this.cartService.getTotalPrice();
    // })
    this.cartdetails();
    this.LoatCart();
    this.getCustomerByToken().subscribe((u) => (this.user = u));
  }

  // get cart Products from Local Storage
  getcartDetails: any = [];
  cartdetails() {
    if (localStorage.getItem('cart')) {
      this.getcartDetails = JSON.parse(localStorage.getItem('cart') || '{}');
      console.log(this.getcartDetails);
      this.TotalItem = this.getcartDetails.length;
    }
  }

  // Decrease and Increase quantity from Cart Side
  incQnt(prodId: number, prodQnt: number, prodStock: number) {
    for (let i = 0; i < this.getcartDetails.length; i++) {
      if (this.getcartDetails[i].id === prodId) {
        if (prodQnt < prodStock) {
          this.getcartDetails[i].quantity = prodQnt + 1;
        }
      }
    }
    localStorage.setItem('cart', JSON.stringify(this.getcartDetails));

    this.LoatCart();
  }

  decQnt(prodId: number, prodQnt: number, prodStock: number) {
    for (let i = 0; i < this.getcartDetails.length; i++) {
      if (this.getcartDetails[i].id === prodId) {
        if (prodQnt != 1) {
          this.getcartDetails[i].quantity = prodQnt - 1;
        }
      }
    }
    localStorage.setItem('cart', JSON.stringify(this.getcartDetails));

    this.LoatCart();
  }

  // Get Total Price for cart
  public TotalPrice: number = 0;
  LoatCart() {
    if (localStorage.getItem('cart')) {
      this.getcartDetails = JSON.parse(localStorage.getItem('cart') || '{}');
      this.TotalPrice = this.getcartDetails.reduce(function (
        acc: any,
        val: any
      ) {
        return acc + val.quantity * val.price;
      },
        0);
    }
  }

  removeItem(cartItemid: number) {
    // this.cartService.removeCartItem(item);
    if (localStorage.getItem('cart')) {
      this.getcartDetails = JSON.parse(localStorage.getItem('cart') || '{}');
      for (let i = 0; i < this.getcartDetails.length; i++) {
        if (this.getcartDetails[i].id === cartItemid) {
          this.getcartDetails.splice(i, 1);
          localStorage.setItem('cart', JSON.stringify(this.getcartDetails));
          this.LoatCart();
          this.cartNumberFunc();
        }
      }
    }
  }

  // function to remove all products in cart
  removeAllItems() {
    localStorage.removeItem('cart');
    this.getcartDetails = [];
    this.TotalPrice = 0;
    this.cartNumber = 0;
    this.cartService.cartSubject.next(this.cartNumber);
  }

  cartNumber: number = 0;
  cartNumberFunc() {
    var cartValue = JSON.parse(localStorage.getItem('cart') || '{}');
    this.cartNumber = cartValue.length;
    this.cartService.cartSubject.next(this.cartNumber);
    // console.log(this.cartNumber);
  }
  checkOut() {
    this.showOrderMaker = true;
    window.scrollTo(0, 1000);
    this.orderDate.getDate();
    console.log(this.orderDate);
  }
  makeOrder(orderAddress: string) {
    let token: string | null;
    token = localStorage.getItem('token');

    if (token == null) {
      this.route.navigate(['login']);
      return;
    }

    //api to get customer_id
    let cust_id = this.user.id;

    let order: Iorder = {
      orderDate: this.orderDate,
      DeliveryDate: this.estimatedDelevryDate,
      Address: orderAddress,
      totalPrice: this.TotalPrice,
      customerId: cust_id,
    };
    console.log(order);

    // make order [post ]
    // this.orderService.addOrder(order).subscribe({
    //   next: (ord) => {
    //     alert('order done');
    //   },
    //   error: (ord) => {
    //     alert('error');
    //   },
    // });
  }
  getCustomerByToken(): Observable<IUser> {
    let myUser = this.HttpClient.get<IUser>(
      `${environment.apiBaseUrl}/api/Customer/profile`,
      this.httoOptions
    );
    return myUser;
  }
}
