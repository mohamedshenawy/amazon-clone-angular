import { Component, OnInit } from '@angular/core';
import { Iproduct } from 'src/app/models/iproduct';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  allProducts:Iproduct[] = []
  constructor(private productsService:ProductsService) { }

  ngOnInit(): void {
    this.productsService.getAllProducts().subscribe(prods=>{this.allProducts = prods})
    console.log(this.allProducts);
  }

}
