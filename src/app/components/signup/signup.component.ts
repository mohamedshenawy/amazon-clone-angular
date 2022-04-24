import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  customerFormGroup!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private route: Router,
    private customerService: CustomerService
  ) {
    this.customerFormGroup = new FormGroup({
      userName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.minLength(6),
        Validators.required,
      ]),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', [
        Validators.required,
        Validators.maxLength(11),
        Validators.pattern(/^01[0125][0-9]{8}$/),
      ]),
      gender: new FormControl('', [
        Validators.required,
        Validators.maxLength(1),
      ]),
      postalCode: new FormControl(''),
      city: new FormControl(''),
      street: new FormControl(''),
    });
  }

  ngOnInit(): void {}

  register() {
    this.customerService.addCustomer(this.customerFormGroup.value);

    this.route.navigate(['/home']);
  }
  //get functions
  get userName() {
    return this.customerFormGroup.get('userName');
  }
  get firstName() {
    return this.customerFormGroup.get('firstName');
  }
  get lastName() {
    return this.customerFormGroup.get('lastName');
  }
  get email() {
    return this.customerFormGroup.get('email');
  }
  get password() {
    return this.customerFormGroup.get('password');
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
  get address() {
    return this.customerFormGroup.get('address');
  }
  get city() {
    return this.customerFormGroup.get('city');
  }
  get street() {
    return this.customerFormGroup.get('street');
  }
}
