import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  profilrForm!: FormGroup;
  forgotpwdForm!: FormGroup;
  navName: any;
  editProfile: any = false;
  changePwd: any = false;
  Profile: any = true;
  submitted = false;
  data: any;
  constructor(
    private api: ApiService,
    private router: Router,
    private fb: FormBuilder,
    private acroute: ActivatedRoute,
    private toastr: ToastrService
  ) {
    api.changeEmitted$.subscribe((text) => {
      this.getProfileUserData();
    });
  }

  ngOnInit(): void {
    this.profilrForm = this.fb.group({
      address: ['', Validators.required],
      id: ['', Validators.required],
      phonenumber: ['', Validators.required],
      gender: ['', Validators.required],
      birth_date: ['', Validators.required],
      image: ['', Validators.required],
    });
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
    this.getName();
    this.getProfileUserData();
  }
  onFileSelect(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.profilrForm.get('image')!.setValue(file);
    }
  }
  get f(): { [key: string]: AbstractControl } {
    return this.forgotpwdForm.controls;
  }

  submit() {
    if (
      this.profilrForm.value.address == '' ||
      this.profilrForm.value.phonenumber == '' ||
      this.profilrForm.value.gender == '' ||
      this.profilrForm.value.birth_date == '' ||
      this.profilrForm.value.image == ''
    ) {
      this.toastr.error('Fill All Information..', '', {
        timeOut: 1000,
      });
    } else if (!(this.profilrForm.value.phonenumber.toString().length == 10)) {
      this.toastr.error('Enter valid Phone Number..', '', {
        timeOut: 1000,
      });
    } else {
      const formData = new FormData();
      formData.append('id', this.profilrForm.get('id')!.value);
      formData.append('address', this.profilrForm.get('address')!.value);
      formData.append(
        'phonenumber',
        this.profilrForm.get('phonenumber')!.value
      );
      formData.append('gender', this.profilrForm.get('gender')!.value);
      formData.append('birth_date', this.profilrForm.get('birth_date')!.value);
      formData.append('image', this.profilrForm.get('image')!.value);
      this.api.profileData(formData).subscribe({
        next: (res) => {
          this.toastr.success('Profile Data Add successfully..', '', {
            timeOut: 1000,
          });
          this.SideProfile();
          this.api.emitChange('Data from child');
        },
        error: (error) => {
          console.log('error', error);
        },
      });
    }
  }
  btnChnagePwd() {
    this.submitted = true;
    if (
      this.forgotpwdForm.value.password == '' ||
      this.forgotpwdForm.value.confirmpassword == ''
    ) {
      console.log('fill');
    } else if (
      this.forgotpwdForm.value.password !== this.forgotpwdForm.value.confirmpassword
    ) {
      this.toastr.error('Password and ConfirmPassword does not match', '', {
        timeOut: 1000,
      });
    }
    else if (this.forgotpwdForm.valid) {
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

  getProfileUserData() {
    this.api.getProfileUserData().subscribe({
      next: (res) => {
        this.profilrForm.get('address')!.patchValue(res[0].address);
        this.profilrForm.get('phonenumber')!.patchValue(res[0].phonenumber);
        this.profilrForm.get('gender')!.patchValue(res[0].gender);
        this.profilrForm
          .get('birth_date')!
          .patchValue(res[0].birth_date.split('T')[0]);
        this.profilrForm.get('image')!.patchValue(res[0].image);
        this.forgotpwdForm.get('id')!.patchValue(res[0].id);
        this.data = res;
      },
      error: (error) => {
        console.log('error', error);
      },
    });
  }

  EditProfile() {
    this.editProfile = true;
    this.Profile = false;
    this.changePwd = false;
  }
  SideProfile() {
    this.editProfile = false;
    this.Profile = true;
    this.changePwd = false;
  }
  SidechangePwd() {
    this.editProfile = false;
    this.Profile = false;
    this.changePwd = true;
  }
  getName() {
    this.api.loggedin().subscribe({
      next: (res) => {
        this.navName = res.data.name;
        this.profilrForm.get('id')!.patchValue(res.data.id);
      },
      error: (error) => {
        console.log('error', error);
      },
    });
  }
  btnlogout() {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }
}
