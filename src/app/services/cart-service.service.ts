import { Iproduct } from 'src/app/models/iproduct';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {

  public cartItems: any = [];
  public ProductList = new BehaviorSubject<any>([]);
  public search = new BehaviorSubject<string>("");

  constructor() { }

  cartSubject = new Subject<any>();

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
    // console.log(this.cartItems)
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

    let storageProducts = JSON.parse(localStorage.getItem('cart') || '{}');
    let products = storageProducts.filter((p: any) => p.id !== product.id);
    localStorage.setItem('cart', JSON.stringify(products));
  }

  removeAllCart() {
    this.cartItems = [];
    this.ProductList.next(this.cartItems);
    localStorage.removeItem('cart')
  }
}
