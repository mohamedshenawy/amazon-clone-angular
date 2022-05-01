import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUserLogIn } from '../models/iuser-log-in';

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
  errorMsg: string = '';
  login(user: IUserLogIn) {
    this.loginAuth(user).subscribe({
      next: (t) => {
        this.errorMsg = '';
        this.token = JSON.stringify(t).split('"')[3];
        console.log(this.token);
        localStorage.setItem('token', this.token);

        this.route.navigate(['/home']);
      },
      error: (err) => {
        this.errorMsg = 'wrong user name and password';
      },
    });

    this.isLoggedSubject.next(true)
  }
  logout() {
    localStorage.removeItem("token");
    this.isLoggedSubject.next(false)
  }
  get isUserLoggedin(): boolean {
    return (localStorage.getItem("token")) ? true : false
  }

  getLoggedStatus(): Observable<boolean> {
    return this.isLoggedSubject.asObservable();
  }
}
