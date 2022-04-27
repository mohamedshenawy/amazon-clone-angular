import { Router } from '@angular/router';
import { Icategory } from './../../models/icategory';
import { CartServiceService } from './../../services/cart-service.service';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Iproduct } from 'src/app/models/iproduct';
import { ProductsService } from 'src/app/services/products.service';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  template: `<pagination-controls (pageChange)="p = $event"></pagination-controls>`
})
export class ProductsComponent implements OnInit, OnChanges {



  searchkey: string = "";

  p: number = 1;

  allProductsList: Iproduct[] = [];
  arrays: any[] = [];


  allCategoriesList: Icategory[] = []
  catId: number = 0;

  FilteredProductList: Iproduct[] = [];
  constructor(private productsService: ProductsService, private cartService: CartServiceService, private router: Router) {
  }

  checkBoxArrayForPrice: any = [
    {
      id: 1,
      type: "checkbox",
      price: "under $500",
    },
    {
      id: 2,
      type: "checkbox",
      price: "$800 to $1000",
    },
    {
      id: 3,
      type: "checkbox",
      price: "above $1000",
    }
  ];
  checkBoxArrayForBrand: any = [
    {
      id: 1,
      type: "checkbox",
      Name: "Lenovo",
    },
    {
      id: 2,
      type: "checkbox",
      Name: "HP",
    },
    {
      id: 3,
      type: "checkbox",
      Name: "Dell",
    },
    {
      id: 4,
      type: "checkbox",
      Name: "Samsung",
    },
    {
      id: 5,
      type: "checkbox",
      Name: "ZARA",
    },
    {
      id: 6,
      type: "checkbox",
      Name: "ASUS",
    },
    {
      id: 7,
      type: "checkbox",
      Name: "REALME",
    }
  ];

  ngOnChanges(changes: SimpleChanges): void {
    // this.filterProdByCategoryId();
    // if (this.catId == 0) {
    //   this.productsService.getAllProducts().subscribe(products => {
    //     this.FilteredProductList = products
    //   })
    // } else {
    //   this.productsService.getProductsByCategory(this.catId).subscribe(products => {
    //     this.FilteredProductList = products
    //   })
    // }
  }

  goTodetails(id: number) {
    this.router.navigate(['productdetails/', id]);
  }


  ngOnInit(): void {

    // get all products
    this.productsService.getAllProducts().subscribe(prods => {
      this.allProductsList = prods;
      this.FilteredProductList = prods
      this.arrays = prods;
      this.allProductsList.forEach((a: any) => {
        Object.assign(a, { quantity: 1, total: a.price })
      });
      // console.log(this.arrays)
    });

    // get all category
    this.productsService.getAllCategories().subscribe(cat => this.allCategoriesList = cat)

    this.cartService.search.subscribe(val => {
      this.searchkey = val
    })
  }
  getprod(catId: number) {

    if (catId == 0) {
      this.productsService.getAllProducts().subscribe(prods => {
        this.allProductsList = prods;
        this.FilteredProductList = this.allProductsList;
        // console.log(this.allProductsList)
        // console.log(this.FilteredProductList)
        this.FilteredProductList.forEach((a: any) => {
          Object.assign(a, { quantity: 1, total: a.price })
        });
      });
    } else {
      this.FilteredProductList = [];
      this.productsService.getProductsByCategory(catId).subscribe(prod => {
        this.FilteredProductList = prod;
        console.log(this.FilteredProductList)
        this.FilteredProductList.forEach((a: any) => {
          Object.assign(a, { quantity: 1, total: a.price })
        });
      })
    }
  }


  // private filterProdByCategoryId() {
  //   if (this.catId == 0) {
  //     this.FilteredProductList = this.allProductsList;
  //   } else {
  //     this.FilteredProductList = this.allProductsList.filter(prod => prod.categoryId == this.catId)
  //   }
  // }

  tempArrayForBrand: any = [];
  newArrayForBrand: any = [];

  flag: number = 0;

  nocheck: number = 0;
  // Filter by brand
  onChange(event: any) {



    if (!event.target.value) {

      this.productsService.getAllProducts().subscribe(prods => {
        this.allProductsList = prods;

        this.arrays = prods;
        this.allProductsList.forEach((a: any) => {
          Object.assign(a, { quantity: 1, total: a.price })
        });
        // console.log(this.arrays)
      });
    }
    if (event.target.checked) {
      this.nocheck += 1;
      this.tempArrayForBrand = this.allProductsList.filter((e: any) => e.brand == event.target.value);
      if (this.flag == 0) {
        this.FilteredProductList = [];
        this.flag = 1;
      }
      // console.log(this.tempArrayForBrand)
      // this.allProductsList = [];
      // this.newArrayForBrand.push(this.tempArrayForBrand);
      // console.log(this.newArrayForBrand)
      for (let i = 0; i < this.tempArrayForBrand.length; i++) {
        this.FilteredProductList.push(this.tempArrayForBrand[i])
      }
      if (this.nocheck == 0) {

        this.productsService.getAllProducts().subscribe(prods => {
          this.FilteredProductList = prods;
          // console.log(this.arrays)
        });
      }
    } else {
      this.nocheck -= 1;

      this.tempArrayForBrand = this.FilteredProductList.filter((e: any) => e.brand != event.target.value);
      // this.newArrayForBrand = [];
      this.FilteredProductList = [];
      // this.allProductsList.push(this.tempArrayForBrand)
      for (let i = 0; i < this.tempArrayForBrand.length; i++) {
        this.FilteredProductList.push(this.tempArrayForBrand[i])
      }
      if (this.nocheck == 0) {
        this.flag = 0;
        this.productsService.getAllProducts().subscribe(prods => {
          this.FilteredProductList = prods;
          // console.log(this.arrays)
        });
      }
    }
    console.log(this.allProductsList)
  }

  decrease(item: any) {
    if (item.quantity > 1) {
      item.quantity = item.quantity - 1
    }
  }

  increase(item: any) {
    if (item.quantity < item.stock) {
      item.quantity = item.quantity + 1
    }
  }



  itemCart: any = [];
  addtoCart(item: any) {
    this.cartNumberFunc()
    // this.cartService.addToCart(item);
    // let products = [];
    // if (localStorage.getItem('cart')) {
    //   products = JSON.parse(localStorage.getItem('cart') || '{}');
    // }
    // products.push(item);
    // localStorage.setItem('cart', JSON.stringify(products));


    let cartData = localStorage.getItem('cart')
    if (cartData == null) {
      let cartproducts: any = [];
      cartproducts.push(item);
      localStorage.setItem('cart', JSON.stringify(cartproducts))
    } else {
      var id = item.id;
      let index: number = -1;
      this.itemCart = JSON.parse(localStorage.getItem('cart') || '{}');
      for (let i = 0; i < this.itemCart.length; i++) {
        if (parseInt(id) === parseInt(this.itemCart[i].id)) {
          this.itemCart[i].quantity = item.quantity;
          index = i;
          break;
        }
      }
      if (index == -1) {
        this.itemCart.push(item)
        localStorage.setItem('cart', JSON.stringify(this.itemCart))
      } else {
        localStorage.setItem('cart', JSON.stringify(this.itemCart))
      }
    }
    this.cartNumberFunc();
  }


  cartNumber: number = 0;
  cartNumberFunc() {
    var cartValue = JSON.parse(localStorage.getItem('cart') || '{}');
    this.cartNumber = cartValue.length;
    this.cartService.cartSubject.next(this.cartNumber)
    // console.log(this.cartNumber);
  }

}
