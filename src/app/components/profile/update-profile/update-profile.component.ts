import { CustomerService } from 'src/app/services/customer.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/models/icustomer';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss']
})
export class UpdateProfileComponent implements OnInit {
  customerFormGroup!: FormGroup;

  httoOptions = {};
  constructor(private HttpClient: HttpClient, private router: Router, private CustomerService: CustomerService) {
    this.httoOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    }






  }
  user!: IUser;
  ngOnInit(): void {

    this.getCustomerByToken().subscribe(user => {
      this.user = user

      // fill inputs with user data

      this.customerFormGroup = new FormGroup({
        id: new FormControl(user['id']),
        name: new FormControl(user['name']),
        email: new FormControl(user['email']),

        phoneNumber: new FormControl(user['phoneNumber']),
        gender: new FormControl(user['gender']),
        postalCode: new FormControl(user['postalCode']),
        city: new FormControl(user['city']),
        street: new FormControl(user['street']),
        profileID: new FormControl(user['profileID']),
      });



    })




  }

  getCustomerByToken(): Observable<IUser> {
    let myUser = this.HttpClient.get<IUser>(`${environment.apiBaseUrl}/api/Customer/profile`, this.httoOptions)
    return myUser
  }

  update() {
    this.CustomerService.updateCustomer(this.user.id, this.customerFormGroup.value).subscribe({
      next: (data) => {
        console.log(data)
      },
      error: (err) => {
        console.log(err)
      },
    })
    this.router.navigate(['/profile']);
  }

  get id() {
    return this.customerFormGroup.get('id');
  }
  get name() {
    return this.customerFormGroup.get('name');
  }
  get email() {
    return this.customerFormGroup.get('email');
  }
  get phoneNumber() {
    return this.customerFormGroup.get('phoneNumber');
  }
  get gender() {
    return this.customerFormGroup.get('gender');
  }
  get postalCode() {
    return this.customerFormGroup.get('postalCode');
  }
  get city() {
    return this.customerFormGroup.get('city');
  }
  get street() {
    return this.customerFormGroup.get('street');
  }
  get profileID() {
    return this.customerFormGroup.get('profileID');
  }





}
