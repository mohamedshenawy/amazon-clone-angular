import {
  Component,
  EventEmitter,
  ElementRef,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormControlName,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @ViewChild('passwordInput') passwordInput!: ElementRef;
  loginFormGroup!: FormGroup;
  token!: string;
  errorMsg: string = '';
  constructor(private loginService: LoginService, private route: Router) {
    this.loginFormGroup = new FormGroup({
      userName: new FormControl(''),
      password: new FormControl(''),
    });
  }

  ngOnInit(): void { }

  isUserLogged: boolean = false;



  login() {
    this.loginService.login(this.loginFormGroup.value);
    this.isUserLogged = this.loginService.isUserLoggedin;

  }



  // show_token() {
  //   let t = localStorage.getItem('token');
  //   console.log(t);
  // }

  despalyPassword() {
    if (this.passwordInput.nativeElement.type == 'password') {
      this.passwordInput.nativeElement.type = 'text';
    } else {
      this.passwordInput.nativeElement.type = 'password';
    }
  }

  //get funcs
  get userName() {
    return this.loginFormGroup.get('userName');
  }
  get password() {
    return this.loginFormGroup.get('password');
  }
}
