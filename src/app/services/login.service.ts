import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUserLogIn } from '../models/iuser-log-in';
import { HeaderComponent } from '../components/header/header.component';
import { LoginComponent } from '../components/login/login.component';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private isLoggedSubject: BehaviorSubject<boolean>;

  httpOptions = {};
  constructor(private httpClient: HttpClient, private route: Router) {
    this.isLoggedSubject = new BehaviorSubject<boolean>(this.isUserLoggedin);
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
  }

  loginAuth(user: IUserLogIn): Observable<IUserLogIn> {
    return this.httpClient.post<IUserLogIn>(
      `${environment.apiBaseUrl}/api/Authentication/Login`,
      JSON.stringify(user),
      this.httpOptions
    );
  }
  token!: string;
  login(user: IUserLogIn) {
    this.isLoggedSubject.next(true);
    return this.loginAuth(user);
  }
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.isLoggedSubject.next(false);
  }
  get isUserLoggedin(): boolean {
    return localStorage.getItem('token') ? true : false;
  }

  getLoggedStatus(): Observable<boolean> {
    return this.isLoggedSubject.asObservable();
  }
}
