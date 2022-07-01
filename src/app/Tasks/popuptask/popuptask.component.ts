import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-popuptask',
  templateUrl: './popuptask.component.html',
  styleUrls: ['./popuptask.component.scss'],
})
export class PopuptaskComponent implements OnInit {
  taskForm!: FormGroup;
  minDate = new Date();
  currentDateTime = new Date(Date.now());
  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private toastr: ToastrService,
    private router: Router,
    private http: HttpClient,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    api.changeEmitted$.subscribe((text) => {
      this.api.getUserTask();
    });
  }

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      userid: ['', Validators.required],
      taskid: ['', Validators.required],
      taskname: ['', Validators.required],
      taskdate: ['', Validators.required],
      tasktime: ['', [Validators.required]],
      status: ['', Validators.required],
    });
    this.userid();
    this.getUserUpdateData();
  }
  btnTask() {
    console.log(this.taskForm.value);
    var taskDateTime = new Date(this.taskForm.value.taskdate);
    taskDateTime.setHours(this.taskForm.value.tasktime.split(':')[0]);
    taskDateTime.setMinutes(this.taskForm.value.tasktime.split(':')[1]);
    if (
      this.taskForm.value.taskname == '' ||
      this.taskForm.value.taskdate == '' ||
      this.taskForm.value.tasktime == '' ||
      this.taskForm.value.status == ''
    ) {
      this.toastr.error('Fill All Information..', '', {
        timeOut: 1000,
      });
    } else if (taskDateTime < this.currentDateTime) {
      this.toastr.error('The time must be greater than the current time.', '', {
        timeOut: 3000,
      });
    } else {
      this.api.addTask(this.taskForm.value).subscribe({
        next: (res) => {
          this.toastr.success('Task Added Successfully..', '', {
            timeOut: 1000,
          });
          this.dialog.closeAll();
          this.api.emitChange('Data from child');
        },

        error: (error) => {
          console.log('error', error);
        },
      });
    }
  }

  getUserUpdateData() {
    this.api.editUserTask(this.data).subscribe({
      next: (res) => {
        this.taskForm.get('taskid')!.patchValue(res[0].id);
        this.taskForm.get('taskname')!.patchValue(res[0].taskname);
        this.taskForm.get('taskdate')!.patchValue(new Date(res[0].taskdate));
        this.taskForm.get('tasktime')!.patchValue(res[0].tasktime);
        this.taskForm.get('status')!.patchValue(res[0].status);
      },
      error: (error) => {
        console.log('error', error);
      },
    });
  }

  updateTask() {
    this.api.updateUserTask(this.taskForm.value).subscribe({
      next: (res) => {
        this.toastr.success('Task Update Successfully..', '', {
          timeOut: 1000,
        });
        this.api.emitChange('Data from child');
      },
      error: (error) => {
        console.log('error', error);
      },
    });
  }

  userid() {
    this.api.loggedin().subscribe({
      next: (res) => {
        console.log('id==>', res.data.id);
        this.taskForm.get('userid')!.patchValue(res.data.id);
        this.taskForm.get('status')!.patchValue('pending');
      },
      error: (error) => {
        console.log('error', error);
      },
    });
  }
}
