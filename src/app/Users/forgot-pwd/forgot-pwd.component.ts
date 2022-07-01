import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
@Component({
  selector: 'app-forgot-pwd',
  templateUrl: './forgot-pwd.component.html',
  styleUrls: ['./forgot-pwd.component.scss']
})
export class ForgotPwdComponent implements OnInit {
  formPasswordEmail!: FormGroup;
  submitted = false;
  constructor(private fb: FormBuilder, private toastr: ToastrService,private api :ApiService) { }

  ngOnInit(): void {
    this.formPasswordEmail = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }
  get f(): { [key: string]: AbstractControl } {
    return this.formPasswordEmail.controls;
  }
  sendMail(){
    this.submitted = true;
    this.api.postEmail(this.formPasswordEmail.value).subscribe({
      next:(res)=>{
        console.log("res",res);
        this.toastr.success('Sent Mail Successfully..', '', {
          timeOut: 1000,
        });
        this.submitted = false;
        this.formPasswordEmail.reset();
      },
      error:(error)=>{
        console.log("errror",error)
        this.toastr.error('User Not Found', '', {
          timeOut: 1000,
        });
      }
    })
  }
}
