import { Iproduct } from 'src/app/models/iproduct';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {

  public cartItems: any = [];
  public ProductList = new BehaviorSubject<any>([]);
  public search = new BehaviorSubject<string>("");

  constructor() { }

  getProducts() {
    return this.ProductList.asObservable();
  }
  setProduct(product: any) {
    this.cartItems.push(...product);
    this.ProductList.next(product);
  }

  addToCart(product: any) {
    this.cartItems.push(product);
    this.ProductList.next(this.cartItems);
    this.getTotalPrice();
    console.log(this.cartItems)
  }

  getTotalPrice(): number {
    let TotalPrice = 0;
    this.cartItems.map((prod: any) => {
      TotalPrice += prod.total;
    })
    return TotalPrice;
  }
  removeCartItem(product: any) {
    this.cartItems.map((a: any, index: any) => {
      if (product.id === a.id) {
        this.cartItems.splice(index, 1);
      }
    })
    this.ProductList.next(this.cartItems)
  }

  removeAllCart() {
    this.cartItems = [];
    this.ProductList.next(this.cartItems);
  }
}
