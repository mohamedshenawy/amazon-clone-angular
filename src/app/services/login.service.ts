import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUserLogIn } from '../models/iuser-log-in';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  httpOptions = {};
  constructor(private httpClient: HttpClient) {
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
}
