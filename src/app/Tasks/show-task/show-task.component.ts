import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-show-task',
  templateUrl: './show-task.component.html',
  styleUrls: ['./show-task.component.scss'],
})
export class ShowTaskComponent implements OnInit {
  navName: any;
  taskData: any = '';
  id:any;
  constructor(private api: ApiService, private router: Router,private acroute:ActivatedRoute) {}

  ngOnInit(): void {
    this.displayTask()
  }
  displayTask() {
    this.id = this.acroute.snapshot.params['id'];

    this.api.showUserTask(this.id).subscribe({
      next: (res) => {
        console.log(res);
        
        const groups = res.reduce((groups: any, task: any) => {
          const name = res[0].name;
          if (!groups[name]) {
            groups[name] = [];
          }
          groups[name].push(task);
          console.log(groups);
          
          return groups;
        }, {});

        this.taskData = Object.keys(groups).map((name) => {          
          return {
            name: res[0].name,
            email: res[0].email,
            tasks: groups[name],
          };
        });
        console.log("this.taskData",this.taskData);
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
