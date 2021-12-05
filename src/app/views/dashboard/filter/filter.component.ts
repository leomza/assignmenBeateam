import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ApiService } from '../../../services/api/api.service';
import { FormGroup, FormControl } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  taskStates: Array<any> = [];
  taskTypes: Array<any> = [];
  dataFiltered: any = [];
  loading: boolean = true;
  selectedStates: Array<string> = [];
  selectedDate: object;

  filterForm = new FormGroup({
    client: new FormControl(''),
    reference: new FormControl(''),
    user: new FormControl(''),
    taskDate: new FormControl(),
    taskType: new FormControl([]),
    taskState: new FormControl([]),
  })

  //Outputs to send the information to the Component Dashboard
  @Output() sendTasksInformation = new EventEmitter()
  @Output() sendLoadingInformation = new EventEmitter()

  //Input from the Component Dashboard when the loading is ready
  @Input() finishLoading: boolean = false;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.getTaskStates().subscribe(data => {
      this.taskStates = data.data
    })

    this.api.getTaskTypes().subscribe(data => {
      this.taskTypes = data.data
    })

    this.onFilter(this.filterForm.value)
  }

  //Check if the item are selected
  checked(taskState: string): any {
    if (this.selectedStates.indexOf(taskState) != -1) {
      return true;
    }
  }

  //When checkbox change, add/remove the item from the array
  onChange(checked: any, taskState: string) {
    if (checked.checked) {
      this.selectedStates.push(taskState);
    } else {
      this.selectedStates.splice(this.selectedStates.indexOf(taskState), 1)
    }
  }

  async onFilter(form: any) {
    //Set the selected state to the form:
    form.taskState = this.selectedStates;
    //Set the selected date to the form:
    form.taskDate = this.selectedDate;
    const dataFiltered$: any = this.api.getAllTasks(form);
    this.dataFiltered = await lastValueFrom(dataFiltered$);
    this.sendTasksInformation.emit(this.dataFiltered.data)
    this.loading = false;
    this.sendLoadingInformation.emit(this.loading)
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
      case 'taskDate':
        this.filterForm.patchValue({ taskDate: '' });
        break;
      case 'taskType':
        this.filterForm.patchValue({ taskType: [] });
        break;
      default:
        break;
    }
  }

  setDate(dateFromInput: any) {
    //Check if the variable is not null
    if (dateFromInput.startDate) {
      const startDate = dateFromInput.startDate._d;
      const startDateFormated = moment(startDate).format('YYYY-MM-DD');

      const endDate = dateFromInput.endDate._d;
      const endDateFormated = moment(endDate).format('YYYY-MM-DD')
      this.selectedDate = { 'inicio': startDateFormated, 'fin': endDateFormated };
    } else {
      this.selectedDate = { 'inicio': '', 'fin': '' };
    }
  }
}