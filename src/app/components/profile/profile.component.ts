import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CustomerService } from 'src/app/services/customer.service';
import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/models/icustomer';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  httoOptions = {};
  constructor(private customerServise: CustomerService, private HttpClient: HttpClient, private router: Router) {
    this.httoOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    }
  }


  getCustomerByToken(): Observable<IUser> {
    let myUser = this.HttpClient.get<IUser>(`${environment.apiBaseUrl}/api/Customer/profile`, this.httoOptions)
    return myUser
  }


  loggerorNot: boolean = false;
  user!: IUser;
  ngOnInit(): void {

    this.getCustomerByToken().subscribe(user => {
      this.user = user

    })
  }


}
