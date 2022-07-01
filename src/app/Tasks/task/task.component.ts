import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { PopuptaskComponent } from '../popuptask/popuptask.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {
  navName: any = '';
  taskData: any = '';
  closeResult: any;
  image: any;
  arr = [];
  idate: any;
  constructor(
    private api: ApiService,
    private router: Router,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private modalService: NgbModal
  ) {
    api.changeEmitted$.subscribe((text) => {
      this.getUserTask();
    });
  }

  ngOnInit(): void {
    this.getName();
    this.getUserTask();
    this.getProfileUserData();
  }
  getName() {
    this.api.loggedin().subscribe({
      next: (res) => {
        this.navName = res.data.name;
      },
      error: (error) => {
        console.log('error', error);
      },
    });
  }
  getUserTask() {
    this.api.getUserTask().subscribe({
      next: (res) => {
        const groups = res.reduce((groups: any, task: any) => {
          const date = task.taskdate;
          if (!groups[date]) {
            groups[date] = [];
          }
          groups[date].push(task);
          return groups;
        }, {});

        this.taskData = Object.keys(groups).map((date) => {
          return {
            date,
            tasks: groups[date],
          };
        });
        console.log(this.taskData);
        // const dateArr: any = [];
        // const sortDate = this.taskData.map((i: any) => {
        //   console.log('i', i.date);
        //   dateArr.push(i.date);
        //   const sortDate = dateArr.sort();
        //   console.log('this.sortDate', sortDate);
        //   sortDate.map((d: any) => {
        //     console.log('d', d.split('T')[0]);
        //   });
        // });
      },
      error: (error) => {
        console.log('error', error);
      },
    });
  }
  openDialog() {
    const dialogRef = this.dialog.open(PopuptaskComponent, {
      width: '30rem',
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }
  btnEdit(id: any) {
    const dialogRef = this.dialog.open(PopuptaskComponent, {
      width: '30rem',
      data: id,
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }
  open(content: any, id: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
          if (result === 'yes') {
            this.deleteHero(id);
          }
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  getProfileUserData() {
    this.api.getProfileUserData().subscribe({
      next: (res) => {
        this.image = res;
      },
      error: (error) => {
        console.log('error', error);
      },
    });
  }
  deleteHero(id: any) {
    this.api.deleteTask(id).subscribe({
      next: (res) => {
        this.toastr.success('Task Delete Successfully..', '', {
          timeOut: 1000,
        });
        this.api.emitChange('Data from child');
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
