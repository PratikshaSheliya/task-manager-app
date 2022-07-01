import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']
})
export class TemplateComponent implements OnInit {
  navName: any = '';
  constructor(    private api: ApiService,) { }

  ngOnInit(): void {
    this.getName()
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
}
