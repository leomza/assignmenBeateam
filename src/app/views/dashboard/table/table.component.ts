import { Component, OnInit, HostListener, Input } from '@angular/core';
import { ListTasksInterface } from '../../../models/listTasks.interface'

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  @Input() tasks: ListTasksInterface[] = [];
  //Page to paginate:
  p: number = 1;
  //Set the number of items per page:
  items: number = 0;

  getScreenHeight: number = 0;

  constructor() { }

  ngOnInit(): void {
    //Set how many items are going to show due the size screen (55 is the number of pixels per row)
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