import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  FormLogin!: FormGroup;
  submitted = false;
  showPassword: boolean = false;
  constructor(
    private formbuilder: FormBuilder,
    private api: ApiService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.FormLogin = this.formbuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }
  
  get f(): { [key: string]: AbstractControl } {
    return this.FormLogin.controls;
  }

  showHidePassword() {
    this.showPassword = !this.showPassword;
  }
  btnLogin(){
    this.submitted = true;
    if (
      this.FormLogin.value.email == '' ||
      this.FormLogin.value.password == ''
    ) {
    } else {
      this.submitted = false;
      this.api.login(this.FormLogin.value).subscribe({
        next: (res) => {
          this.toastr.success('Login Successfully..', '', {
            timeOut: 1000,
          });
          localStorage.setItem('token', res.token);
          this.FormLogin.reset()
          this.router.navigate(['task'])
        },
        error: (error) => {
          if (error.error.msg) {
            this.toastr.error('User Not Found', '', {
              timeOut: 1000,
            });
          } else {
            this.toastr.error('Invalid Details..', '', {
              timeOut: 1000,
            });
          }
          console.log('error', error);
        },
      });
    }
  }
}
