import { CartServiceService } from './../../services/cart-service.service';
import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnChanges {

  searchTerm: string = '';
  public TotalItem: number = 0;

  productName: string = ""
  constructor(private cartService: CartServiceService) {
    this.cartService.cartSubject.subscribe((data) => {
      this.cartItem = data
    })
  }
  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnInit(): void {
    this.cartItemFunc();
  }

  cartItem: number = 0;
  cartItemFunc() {
    if (localStorage.getItem('cart') != null) {
      var cartCount = JSON.parse(localStorage.getItem('cart') || '{}');
      this.cartItem = cartCount.length
    }
  }

  searchByName(pName: string) {
    this.productName = pName;
    console.log(this.productName);
  }

  search(event: any) {
    this.searchTerm = (event.target as HTMLInputElement).value;
    console.log(this.searchTerm);
    this.cartService.search.next(this.searchTerm);
  }


}
