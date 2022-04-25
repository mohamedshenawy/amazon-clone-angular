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
  public TotalPrice !: number;
  constructor(private cartService: CartServiceService) {

  }

  ngOnInit(): void {
    this.cartService.getProducts().subscribe(res => {
      this.products = res;
      this.TotalPrice = this.cartService.getTotalPrice();
    })
  }

  removeItem(item: Iproduct) {
    this.cartService.removeCartItem(item)
  }
  emptyCart() {
    this.cartService.removeAllCart();
  }
}
