import { Iproduct } from './../../models/iproduct';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { Icategory } from './../../models/icategory';
import { CartServiceService } from './../../services/cart-service.service';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import { ProductsService } from 'src/app/services/products.service';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnChanges {




  searchkey: string = "";

  p: number = 1;

  allProductsList: Iproduct[] = [];
  arrays: any[] = [];


  allCategoriesList: Icategory[] = []
  catId: number = 0;

  FilteredProductList: Iproduct[] = [];

  currentLang: string = '';
  constructor(private productsService: ProductsService, private cartService: CartServiceService, private router: Router,
    public translate: TranslateService) {
    this.currentLang = localStorage.getItem('currentLang') || 'en';
    this.translate.use(this.currentLang)

  }

  checkBoxArrayForPrice: any = [
    {
      id: 1,
      type: "checkbox",
      price: "under $200",
      priceRange: "0 200",
    },
    {
      id: 2,
      type: "checkbox",
      price: "$200 to $400",
      priceRange: "200 400",
    },
    {
      id: 3,
      type: "checkbox",
      price: "$400 to $600",
      priceRange: "400 600",
    },
    {
      id: 4,
      type: "checkbox",
      price: "$600 to $800",
      priceRange: "600 800",
    },
    {
      id: 5,
      type: "checkbox",
      price: "$800 to $1000",
      priceRange: "800 1000",
    },
    {
      id: 6,
      type: "checkbox",
      price: "above $1000",
      priceRange: "1000 10000",
    }
  ];
  checkBoxArrayForBrand: any = [
    {
      id: 1,
      type: "checkbox",
      Name: "Lenovo",
      ArName: "لينوفو"
    },
    {
      id: 2,
      type: "checkbox",
      Name: "HP",
      ArName: "اتش بي"
    },
    {
      id: 3,
      type: "checkbox",
      Name: "Dell",
      ArName: "ديل"
    },
    {
      id: 4,
      type: "checkbox",
      Name: "Samsung",
      ArName: "سامسونج"
    },
    {
      id: 5,
      type: "checkbox",
      Name: "ZARA",
      ArName: "زارا"
    },
    {
      id: 6,
      type: "checkbox",
      Name: "ASUS",
      ArName: "اسيوس"
    },
    {
      id: 7,
      type: "checkbox",
      Name: "REALME",
      ArName: "ريلمي"
    },
    {
      id: 8,
      type: "checkbox",
      Name: "IPhone",
      ArName: "ايفون"
    },
  ];

  ngOnChanges(changes: SimpleChanges): void {

  }

  ngOnInit(): void {



    // get all products
    this.productsService.getAllProducts().subscribe(prods => {
      this.allProductsList = prods;
      this.FilteredProductList = prods

      this.FilteredProductList.forEach((a: Iproduct) => {
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
        // console.log(this.FilteredProductList)
        this.FilteredProductList.forEach((a: any) => {
          Object.assign(a, { quantity: 1, total: a.price })
        });
      })
    }
  }


  goTodetails(id: number) {
    this.router.navigate(['productdetails/', id]);
  }

  tempArrayForBrand: any = [];

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
      console.log(event.target.value)
      this.nocheck += 1;
      var myvalue = event.target.value.split(' ', 2)
      var minPrice = +myvalue[0]
      var maxPrice = +myvalue[1]

      this.tempArrayForBrand = this.allProductsList.filter((e: any) => (e.brand == event.target.value || e.price >= minPrice && e.price < maxPrice));
      if (this.flag == 0) {
        this.FilteredProductList = [];
        this.flag = 1;
      }
      for (let i = 0; i < this.tempArrayForBrand.length; i++) {
        this.FilteredProductList.push(this.tempArrayForBrand[i])
      }
      if (this.nocheck == 0) {

        this.productsService.getAllProducts().subscribe(prods => {
          this.FilteredProductList = prods;
          this.FilteredProductList.forEach((a: any) => {
            Object.assign(a, { quantity: 1, total: a.price })
          });
          // console.log(this.arrays)
        });
      }
    } else {
      this.nocheck -= 1;

      var myvalue = event.target.value.split(' ', 2)
      var minPrice = +myvalue[0]
      var maxPrice = +myvalue[1]
      this.tempArrayForBrand = this.FilteredProductList.filter((e: any) => !(e.brand == event.target.value || e.price >= minPrice && e.price < maxPrice));
      this.FilteredProductList = [];
      // this.allProductsList.push(this.tempArrayForBrand)
      for (let i = 0; i < this.tempArrayForBrand.length; i++) {
        this.FilteredProductList.push(this.tempArrayForBrand[i])
      }
      if (this.nocheck == 0) {
        this.flag = 0;
        this.productsService.getAllProducts().subscribe(prods => {
          this.FilteredProductList = prods;
          this.FilteredProductList.forEach((a: any) => {
            Object.assign(a, { quantity: 1, total: a.price })
          });
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
