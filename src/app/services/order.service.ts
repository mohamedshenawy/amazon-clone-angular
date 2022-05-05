import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ObservableInput } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Iorder } from '../models/iorder';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  httpOptions = {};
  constructor(private httpClient: HttpClient) {}
  getOrders(): Observable<Iorder[]> {
    return this.httpClient.get<Iorder[]>(
      `${environment.apiBaseUrl}/api/orders`
    );
  }
  getOrderDetails(ordId: number): Observable<Iorder> {
    return this.httpClient.get<Iorder>(
      `${environment.apiBaseUrl}/orders/getdetails`
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
