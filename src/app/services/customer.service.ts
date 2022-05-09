import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser } from '../models/icustomer';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  httpOptions = {};
  constructor(private httpClient: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
  }

  addCustomer(user: IUser): Observable<IUser> {
    return this.httpClient.post<IUser>(
      `${environment.apiBaseUrl}/api/Authentication/Register`,
      JSON.stringify(user),
      this.httpOptions
    );
  }

  // getCustomerByToken(token: number): Observable<IUser> {
  //   return this.httpClient.get<IUser>(
  //     `${environment.apiBaseUrl}/api/Customer/profile${token}`
  //   );
  // }
}
