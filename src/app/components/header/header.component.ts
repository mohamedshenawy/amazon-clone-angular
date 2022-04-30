import { CartServiceService } from './../../services/cart-service.service';
import { TranslateService } from '@ngx-translate/core';
import {
  Component,
  OnInit,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnChanges {
  searchTerm: string = '';
  public TotalItem: number = 0;
  productName: string = '';
  userName: String | null = '';

  currentLang: string = '';
  constructor(private cartService: CartServiceService, public translate: TranslateService) {

    this.currentLang = localStorage.getItem('currentLagn') || 'en';
    this.translate.use(this.currentLang)

    this.cartService.cartSubject.subscribe((data) => {
      this.cartItem = data;
    });
  }

  changeCurrentLang(lang: string) {
    this.translate.use(lang)
    localStorage.setItem('currentLagn', lang)
  }

  ngOnChanges(changes: SimpleChanges): void { }

  ngOnInit(): void {
    this.cartItemFunc();
    this.getUsernameFormLocalStorage();


  }

  cartItem: number = 0;
  cartItemFunc() {
    if (localStorage.getItem('cart') != null) {
      var cartCount = JSON.parse(localStorage.getItem('cart') || '{}');
      this.cartItem = cartCount.length;
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
  getUsernameFormLocalStorage() {
    try {
      this.userName = localStorage.getItem('username');
    } catch (e) {
      console.log(e);
    }
  }
  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.userName = '';
  }
}
