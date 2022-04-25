import { Icategory } from './../../models/icategory';
import { CartServiceService } from './../../services/cart-service.service';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Iproduct } from 'src/app/models/iproduct';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnChanges {


  searchkey: string = "";
  allProductsList: Iproduct[] = [];

  FilteredProductList: Iproduct[] = []


  allCategoriesList: Icategory[] = []
  catId: number = 0;

  constructor(private productsService: ProductsService, private cartService: CartServiceService) { }
  ngOnChanges(changes: SimpleChanges): void {
    this.filterProdByCategoryId();
  }



  ngOnInit(): void {

    // get all products
    this.productsService.getAllProducts().subscribe(prods => {
      this.allProductsList = prods;

      this.allProductsList.forEach((a: any) => {
        Object.assign(a, { quantity: 1, total: a.price })
      });
      console.log(this.allProductsList)
    });

    // get all category
    this.productsService.getAllCategories().subscribe(cat => this.allCategoriesList = cat)

    this.cartService.search.subscribe(val => {
      this.searchkey = val
    })
  }

  getCatId(id: number) {
    this.catId = id;
    // console.log(this.catId)
  }

  private filterProdByCategoryId() {
    if (this.catId == 0) {
      this.FilteredProductList = this.allProductsList;
    } else {
      this.FilteredProductList = this.allProductsList.filter(prod => prod.categoryId == this.catId)
    }
  }

  addtoCart(item: Iproduct) {
    this.cartService.addToCart(item)
  }
}
