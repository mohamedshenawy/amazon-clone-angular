import { Iproduct } from 'src/app/models/iproduct';
import { CartServiceService } from './../../services/cart-service.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { render } from 'creditcardpayments/creditCardPayments';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/models/icustomer';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Iorder } from 'src/app/models/iorder';
import { OrderService } from 'src/app/services/order.service';
import { IorderProduct } from 'src/app/models/iorder-product';
import { OrderProductService } from 'src/app/services/order-product.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {

  gettoken = localStorage.getItem('token');
  URL = environment.DashboardURL;

  Delivery: number = 5;
  public products: any = [];
  public TotalItem: number = 0;
  showOrderMaker: boolean = false;
  orderDate = new Date();
  estimatedDelevryDate = new Date();
  httoOptions = {};
  @ViewChild('orderAddress') orderAddress!: ElementRef;
  user!: IUser;
  currentLang: string = '';
  constructor(
    private cartService: CartServiceService,
    private route: Router,
    private HttpClient: HttpClient,
    private orderProdService: OrderProductService,
    public translate: TranslateService
  ) {
    this.httoOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }),
    };
    this.cartService.cartSubject.subscribe((data) => {
      this.TotalItem = data;
    });
    this.currentLang = localStorage.getItem('currentLang') || 'en';

    this.translate.use(this.currentLang);
    // render({
    //   id: '#myPaypalButtons',
    //   currency: 'USD',
    //   value: this.TotalPrice.toString(),
    //   onApprove: (details) => {
    //     this.makeOrder(this.orderAddress.nativeElement.value);
    //     alert('Transaction Successfully');
    //   },
    // });
    this.translate.use(this.currentLang);
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

    this.estimatedDelevryDate.setDate(this.estimatedDelevryDate.getDate() + 10);
  }

  // get cart Products from Local Storage
  getcartDetails: any = [];
  cartdetails() {
    if (localStorage.getItem('cart')) {
      this.getcartDetails = JSON.parse(localStorage.getItem('cart') || '{}');
      // console.log(this.getcartDetails);
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
  TotalPrice: number = 0;
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
    render({
      id: '#myPaypalButtons',
      currency: 'USD',
      value: this.TotalPrice.toString() + 5,
      onApprove: (details) => {
        this.makeOrder(this.orderAddress.nativeElement.value);
        alert('Transaction Successfully');
        this.route.navigate(['/succesfullorder']);
      },
    });
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
    // this.estimatedDelevryDate.setDate(this.estimatedDelevryDate.getDate() + 3);
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
    //list of order product
    let orderproducts: IorderProduct[] = [];

    for (let p of this.getcartDetails) {
      let orderProd: IorderProduct = {
        ProductId: p.id,
        Quantity: p.quantity,
      };
      orderproducts.push(orderProd);
    }
    console.log(orderproducts);

    // make order [post ]
    this.orderProdService.addOrder(orderproducts, orderAddress).subscribe({
      next: (p) => {
        console.log('order sent');
      },
    });
  }
  getCustomerByToken(): Observable<IUser> {
    let myUser = this.HttpClient.get<IUser>(
      `${environment.apiBaseUrl}/api/Customer/profile`,
      this.httoOptions
    );
    return myUser;
  }
}
