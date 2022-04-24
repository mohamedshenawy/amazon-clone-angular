import { Component, OnInit } from '@angular/core';
import { Iproduct } from 'src/app/models/iproduct';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  allProducts: Iproduct[] = []
  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this.productsService.getAllProducts().subscribe(prods => { this.allProducts = prods })
    console.log(this.allProducts);
  }

  test() {
    console.log(this.allProducts);

  }
}
