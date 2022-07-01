import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
@Component({
  selector: 'app-link-pwd',
  templateUrl: './link-pwd.component.html',
  styleUrls: ['./link-pwd.component.scss']
})
export class LinkPwdComponent implements OnInit {
  forgotpwdForm!: FormGroup;
  submitted = false;
  id: any;
  constructor( private fb: FormBuilder,
    private acroute: ActivatedRoute,
    private toastr: ToastrService,
    private api :ApiService,
    private router : Router) { }

  ngOnInit(): void {
    this.forgotpwdForm = this.fb.group({
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
      id: ['', Validators.required],
    });
    this.id = this.acroute.snapshot.queryParams['email'];
    this.forgotpwdForm.get('id')!.patchValue(this.id);
  }
  get f(): { [key: string]: AbstractControl } {
    return this.forgotpwdForm.controls;
  }

  btnsubmit() {
    this.submitted = true;
    if (
      this.forgotpwdForm.value.password !==
      this.forgotpwdForm.value.confirmpassword
    ) {
      this.toastr.error('Password and ConfirmPassword does not match', '', {
        timeOut: 1000,
      });
    } else if(this.forgotpwdForm.valid) {
      console.log("this.id",this.id)
      console.log(",this.forgotpwdForm.value",this.forgotpwdForm.value)
      this.api.chagePassword(this.forgotpwdForm.value).subscribe({
        next:(res)=>{
          this.toastr.success('Change Password Successfully.', '', {
            timeOut: 1000,
          });
          this.router.navigate(['login'])
        },
        error:(error)=>{
          console.log("error",error)
        }
      })
    }
  }
}
