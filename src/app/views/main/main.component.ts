import { Component, OnInit, HostListener } from '@angular/core';
import { ApiService } from '../../services/api/api.service'
import { Router } from '@angular/router';
import { ListTasksInterface } from '../../models/listTasks.interface'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  tasks: ListTasksInterface[] = [];
  //Page to paginate:
  p: number = 1;
  //Set the number of items per page:
  items: number = 0;

  getScreenHeight: any;

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.api.getAllTasks().subscribe(data => {
      this.tasks = data.data
    })
    //When I start the page, I set how many items to show due the size screen (55 is the number of pixels per row)
    this.getScreenHeight = window.innerHeight;
    this.items = (Math.floor(this.getScreenHeight / 55));
  }

  @HostListener('window:resize', ['$event'])

  onWindowResize() {
    this.getScreenHeight = window.innerHeight;
    //When I change the size of the screen, I calculate the number of items again
    this.items = (Math.floor(this.getScreenHeight / 55));
  }
}
