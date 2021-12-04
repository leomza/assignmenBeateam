import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api/api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  taskStates: any[] = [];
  taskTypes: any[] = [];

  filterForm = new FormGroup({
    client: new FormControl(''),
    reference: new FormControl(''),
    user: new FormControl(''),
    taskType: new FormControl(''),
    taskState: new FormControl(''),
  })

  selectedStates: Array<any> = [];
  dataFiltered: any = []

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.getTaskStates().subscribe(data => {
      this.taskStates = data.data
    })

    this.api.getTaskTypes().subscribe(data => {
      this.taskTypes = data.data
    })
  }

  // check if the item are selected
  checked(taskState: any): any {
    if (this.selectedStates.indexOf(taskState) != -1) {
      return true;
    }
  }

  // when checkbox change, add/remove the item from the array
  onChange(checked: any, taskState: any) {
    if (checked.checked) {
      this.selectedStates.push(taskState);
    } else {
      this.selectedStates.splice(this.selectedStates.indexOf(taskState), 1)
    }
  }

  onFilter(form: any) {
    form.taskState = this.selectedStates;
    console.log(form);
    this.api.getAllTasksFiltered(form).subscribe(data => {
      this.dataFiltered = data.data
      console.log(this.dataFiltered);
    })
  }

  handleClear(itemToClear: string) {
    switch (itemToClear) {
      case 'client':
        this.filterForm.patchValue({ client: '' });
        break;
      case 'reference':
        this.filterForm.patchValue({ reference: '' });
        break;
      case 'user':
        this.filterForm.patchValue({ user: '' });
        break;
      case 'taskType':
        this.filterForm.patchValue({ taskType: '' });
        break;
      default:
        break;
    }
  }


}
