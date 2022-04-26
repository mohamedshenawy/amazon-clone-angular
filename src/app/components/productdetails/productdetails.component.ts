import { ProductsService } from 'src/app/services/products.service';
import { Iproduct } from 'src/app/models/iproduct';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.scss']
})
export class ProductdetailsComponent implements OnInit {

  currentId: number = 0;
  product: any;
  constructor(private activateRoute: ActivatedRoute, private producrService: ProductsService,
    private location: Location, private router: Router) { }

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
        console.log(this.product)
      });

    });

    console.log(this.currentId)

  }

}
