
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Iproduct } from '../models/iproduct';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  httpOptions={};
  constructor(private httpClient:HttpClient) {
    this.httpOptions={
      headers: new HttpHeaders({ 
        'Content-Type':'application/json'
      })
    };
    }

  //read
  getAllProducts():Observable<Iproduct[]>{
    return this.httpClient.get<Iproduct[]>(`${environment.apiBaseUrl}/api/Product`)
  }
  
  getProductsByCategory(catID:number):Observable<Iproduct[]>{
    if(catID==0){
      return this.getAllProducts();
    }

    return this.httpClient.get<Iproduct[]>(`${environment.apiBaseUrl}/products?CategoryID=${catID}`)
  }

  getProductsById(prodID:number):Observable<Iproduct>{
    //let p:Iproduct 
    return this.httpClient.get<Iproduct>(`${environment.apiBaseUrl}/products/${prodID}`)
    //obserProd.subscribe(prod => p = prod);
    //return p;
    
  }
  
  getProductsIds():number[]{
    let idsList:number[] = []
    this.getAllProducts().subscribe(
      list=>{
        idsList =  list.map(item=>item.id);
      }
    )
    return idsList;
  }
  addProduct(prod:Iproduct):Observable<Iproduct>{
    return this.httpClient.post<Iproduct>(`${environment.apiBaseUrl}/products` , JSON.stringify(prod) , this.httpOptions)
  }
  deleteProduct(prodID:number):Observable<Iproduct>{
    return this.httpClient.delete<Iproduct>(`${environment.apiBaseUrl}/products/${prodID}`)
  }
}
