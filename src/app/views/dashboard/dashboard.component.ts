import { Component, OnInit } from '@angular/core';
import { ListTasksInterface } from 'src/app/models/listTasks.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  tasks: Array<ListTasksInterface> = [];
  loading: boolean = true;
  //Propery to send to Filter Component:
  finishLoading : boolean = false;

  constructor() { }

  ngOnInit(): void { }

  //Information from the component "Filter"
  recieveInformationTasks(tasksFiltered: Array<ListTasksInterface>) {
    this.tasks = tasksFiltered;
  }

  //Information from the component "Filter"
  recieveInformationLoading(loadingInfo: boolean) {
    this.loading = loadingInfo;
    this.finishLoading = true;
  }
}
