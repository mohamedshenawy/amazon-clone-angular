import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ObservableInput } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Iorder } from '../models/iorder';
import { IorderProduct } from '../models/iorder-product';
import { Iorderdetails } from '../models/iorderdetails';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  httpOptions = {};
  constructor(private httpClient: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }),
    };
  }

  getOrders(): Observable<Iorder[]> {
    return this.httpClient.get<Iorder[]>(
      `${environment.apiBaseUrl}/api/Order/get`,
      this.httpOptions
    );
  }

  getOrderDetails(ordId: number): Observable<Iorderdetails[][]> {
    return this.httpClient.get<Iorderdetails[][]>(
      `${environment.apiBaseUrl}/api/Order/getDetails?id=${ordId}`
    );
  }
  // getOrdersIds(): number[] {
  //   let idsList: number[] = [];
  //   this.getOrders().subscribe((list) => {
  //     idsList = list.map((item) => item.id);
  //   });
  //   return idsList;
  // }
  addOrder(ord: Iorder): Observable<Iorder[]> {
    return this.httpClient.post<Iorder[]>(
      `${environment.apiBaseUrl}/orders`,
      JSON.stringify(ord),
      this.httpOptions
    );
  }
  updateOrder(ord: Iorder): Observable<Iorder> {
    return this.httpClient.put<Iorder>(
      `${environment.apiBaseUrl}/orders`,
      JSON.stringify(ord),
      this.httpOptions
    );
  }
  deleteOrder(ordId: number): Observable<Iorder> {
    return this.httpClient.delete<Iorder>(
      `${environment.apiBaseUrl}/orders/${ordId}`,
      this.httpOptions
    );
  }
}
