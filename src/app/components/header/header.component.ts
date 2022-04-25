import { CartServiceService } from './../../services/cart-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  searchTerm: string = '';
  public TotalItem: number = 0;

  productName: string = ""
  constructor(private cartService: CartServiceService) { }

  ngOnInit(): void {
    this.cartService.getProducts().subscribe(res => {
      this.TotalItem = res.length;
    })
  }
  searchByName(pName: string) {
    this.productName = pName;
    console.log(this.productName);
  }

  search(event: any) {
    this.searchTerm = (event.target as HTMLInputElement).value;
    console.log(this.searchTerm);
    this.cartService.search.next(this.searchTerm);
  }

}
