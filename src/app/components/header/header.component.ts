import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { Observable } from 'rxjs';
import { IUser } from './../../models/icustomer';
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
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

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

  httoOptions = {};

  constructor(
    private cartService: CartServiceService,
    public translate: TranslateService,
    private LoginService: LoginService,
    private HttpClient: HttpClient,
    private route: Router
  ) {
    this.currentLang = localStorage.getItem('currentLang') || 'en';
    this.translate.use(this.currentLang);

    this.cartService.cartSubject.subscribe((data) => {
      this.cartItem = data;
    });

    this.httoOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }),
    };
  }

  getCustomerByToken(): Observable<IUser> {
    let myUser = this.HttpClient.get<IUser>(
      `${environment.apiBaseUrl}/api/Customer/profile`,
      this.httoOptions
    );
    return myUser;
  }

  isUserLogged: boolean = false;
  logout() {
    this.LoginService.logout();
    this.isUserLogged = this.LoginService.isUserLoggedin;
    this.route.navigate(['/login']);
  }

  changeCurrentLang(lang: string) {
    this.translate.use(lang);
    localStorage.setItem('currentLang', lang);
  }

  ngOnChanges(changes: SimpleChanges): void { }

  user!: IUser;

  ngOnInit(): void {
    this.cartItemFunc();
    this.getUsernameFormLocalStorage();

    this.LoginService.getLoggedStatus().subscribe((status) => {
      this.isUserLogged = status;
    });

    this.getCustomerByToken().subscribe((user) => {
      this.user = user;
      this.userName = user.name;
    });
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
    } catch {
      this.userName = '';
    }
  }
}
