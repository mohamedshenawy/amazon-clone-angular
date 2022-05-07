import { CartServiceService } from './../../services/cart-service.service';
import { ProductsService } from 'src/app/services/products.service';
import { Iproduct } from 'src/app/models/iproduct';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.scss']
})
export class ProductdetailsComponent implements OnInit {

  currentId: number = 0;
  product: any;

  productQnt: number = 1;
  currentLang: string = '';
  constructor(private activateRoute: ActivatedRoute, private producrService: ProductsService,
    private router: Router, private location: Location, private cartService: CartServiceService, private translate: TranslateService) {
    this.currentLang = localStorage.getItem('currentLang') || 'en';
    this.translate.use(this.currentLang)
  }

  ngOnInit(): void {


    // this.activateRoute.paramMap.subscribe((paramMap) => {
    //   this.currentId = paramMap.get('id')
    //      Number(this.activateRoute.snapshot.paramMap.get('id'))
    //     : 0;
    //   this.producrService.getProductsById(this.currentId).subscribe(data => this.product = data)
    // })
    this.activateRoute.paramMap.subscribe((paramMap) => {
      this.currentId = paramMap.get('id')
        ? Number(this.activateRoute.snapshot.paramMap.get('id'))
        : 0;
      this.producrService.getProductsById(this.currentId).subscribe((pro) => {
        this.product = pro;
        // console.log(this.product)
      });

    });

    console.log(this.currentId)

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
