import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';
import { Iproduct } from 'src/app/models/iproduct';
import { ProductsService } from 'src/app/services/products.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  URL = environment.DashboardURL;
  allProducts: Iproduct[] = []

  currentLang: string = '';

  constructor(private productsService: ProductsService, public translate: TranslateService) {
    this.currentLang = localStorage.getItem('currentLang') || 'en';
    this.translate.use(this.currentLang)
  }

  ngOnInit(): void {
    this.productsService.getAllProducts().subscribe(prods => {
      this.allProducts = prods;
      // console.log(this.allProducts);
      for (var i = 0; i < this.allProducts.length; i++) {
        console.log(this.allProducts[i].name_AR);
      }
    })

  }

}

