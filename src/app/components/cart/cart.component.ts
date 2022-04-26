import { Iproduct } from 'src/app/models/iproduct';
import { CartServiceService } from './../../services/cart-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  Delivery: number = 5;
  public products: any = [];
  public TotalItem: number = 0;

  constructor(private cartService: CartServiceService) {

  }

  ngOnInit(): void {
    // this.cartService.getProducts().subscribe(res => {
    //   this.products = res;
    //   this.TotalItem = res.length;
    // this.TotalPrice = this.cartService.getTotalPrice();
    // })
    this.cartdetails();
    this.LoatCart();
  }


  // get cart Products from Local Storage
  getcartDetails: any = []
  cartdetails() {
    if (localStorage.getItem('cart')) {
      this.getcartDetails = JSON.parse(localStorage.getItem('cart') || '{}')
      console.log(this.getcartDetails)
    }
  }


  // Decrease and Increase quantity from Cart Side
  incQnt(prodId: number, prodQnt: number, prodStock: number) {
    for (let i = 0; i < this.getcartDetails.length; i++) {
      if (this.getcartDetails[i].id === prodId) {
        if (prodQnt < prodStock) {
          this.getcartDetails[i].quantity = prodQnt + 1
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
          this.getcartDetails[i].quantity = prodQnt - 1
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
      this.getcartDetails = JSON.parse(localStorage.getItem('cart') || '{}')
      this.TotalPrice = this.getcartDetails.reduce(function (acc: any, val: any) {
        return acc + (val.quantity * val.price)
      }, 0)
    }
  }



  removeItem(cartItemid: number) {
    // this.cartService.removeCartItem(item);
    if (localStorage.getItem('cart')) {
      this.getcartDetails = JSON.parse(localStorage.getItem('cart') || '{}')
      for (let i = 0; i < this.getcartDetails.length; i++) {
        if (this.getcartDetails[i].id === cartItemid) {
          this.getcartDetails.splice(i, 1);
          localStorage.setItem('cart', JSON.stringify(this.getcartDetails));
          this.LoatCart()
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
    this.cartService.cartSubject.next(this.cartNumber)
  }


  cartNumber: number = 0;
  cartNumberFunc() {
    var cartValue = JSON.parse(localStorage.getItem('cart') || '{}');
    this.cartNumber = cartValue.length;
    this.cartService.cartSubject.next(this.cartNumber)
    // console.log(this.cartNumber);
  }


}

