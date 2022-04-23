import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  productName:string = ""
  constructor() { }

  ngOnInit(): void {
  }
  searchByName(pName:string){
    this.productName = pName;
    console.log(this.productName);
    
  }

}
