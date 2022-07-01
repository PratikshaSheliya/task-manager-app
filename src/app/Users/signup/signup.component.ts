import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  FormSignUp!: FormGroup;
  showPassword: boolean = false;
  showcomPassword: boolean = false;
  submitted = false;
  constructor(private fb: FormBuilder, private toastr: ToastrService,private api:ApiService,private router :Router) {}

  ngOnInit(): void {
    this.FormSignUp = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{5,}'
          ),
        ],
      ],
      confirmpassword: ['', Validators.required],
    });
  }
  get f(): { [key: string]: AbstractControl } {
    return this.FormSignUp.controls;
  }
  showHidePassword() {
    this.showPassword = !this.showPassword;
  }
  showHidecomPassword() {
    this.showcomPassword = !this.showcomPassword;
  }
  btnSignUp() {
    this.submitted = true;
    if (
      this.FormSignUp.value.name == '' ||
      this.FormSignUp.value.email == '' ||
      this.FormSignUp.value.password == '' ||
      this.FormSignUp.value.confirmpassword == ''
    ) {
      console.log('fill');
    } else if (
      this.FormSignUp.value.password !== this.FormSignUp.value.confirmpassword
    ) {
      this.toastr.error('Password and ConfirmPassword does not match', '', {
        timeOut: 1000,
      });
    }
    else if (this.FormSignUp.valid) {
      this.api.signUp(this.FormSignUp.value).subscribe({
        next: (res) => {
          this.FormSignUp.reset();
          this.toastr.success('SignUp Successfully..', '', {
            timeOut: 1000,
          });
          this.router.navigate(['login']);
        },
        error: (error) => {
          this.toastr.error('Email is Already Exits..', '', {
            timeOut: 1000,
          });
          console.log('error', error);
        },
      });
    }
  }
}
