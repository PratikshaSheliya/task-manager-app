import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  navName: any;
  tasks: any;
  image:any;
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'id',
    'name',
    'email',
    'totalCount',
    'action'
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private router: Router, private api: ApiService) {}

  ngOnInit(): void {
    this.getName();
    this.displayTask();
    this.getProfileUserData()
  }

  displayTask() {
    this.api.taskCount().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (error) => {
        console.log('error', error);
      },
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  btnShow(id:any){
    this.router.navigate(['/showtask/',id])
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
  btnlogout() {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }
}
