import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IorderProduct } from '../models/iorder-product';

@Injectable({
  providedIn: 'root',
})
export class OrderProductService {
  httpOptions = {};
  constructor(private httpClient: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }),
    };
  }

  addOrder(
    orderProds: IorderProduct[],
    address: string
  ): Observable<IorderProduct[]> {
    return this.httpClient.post<IorderProduct[]>(
      `${environment.apiBaseUrl}/api/Order/add?address=${address}`,
      JSON.stringify(orderProds),
      this.httpOptions
    );
  }
}
