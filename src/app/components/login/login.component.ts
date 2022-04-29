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

  ngOnInit(): void {}

  logIn() {
    this.loginService.loginAuth(this.loginFormGroup.value).subscribe({
      next: (t) => {
        this.errorMsg = '';
        this.token = JSON.stringify(t).split('"')[3];
        console.log(this.token);
        localStorage.setItem('token', this.token);
        localStorage.setItem(
          'username',
          this.loginFormGroup.get('userName')?.value
        );

        this.route.navigate(['/home']);
      },
      error: (err) => {
        this.errorMsg = 'wrong user name and password';
      },
    });
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
