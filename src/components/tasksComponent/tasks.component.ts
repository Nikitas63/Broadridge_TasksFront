import { Component } from '@angular/core';

import { TasksService } from '../../dataServices/services/tasksService';
import { TasksSource } from '../../dataServices/clientModels/tasksSource';
import { Task } from '../../dataServices/clientModels/task';
import { LazyLoadEvent } from 'primeng/api';

@Component({
  selector: 'broad-tasks-component',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent {

  constructor(private _tasksService: TasksService) {
  }

  protected tasks: Task[];

  protected totalRecords: number;

  protected tasksSource: TasksSource;

  protected loadTasksLazy(event: LazyLoadEvent) {
    //in a real application, make a remote request to load data using state metadata from event
    //event.first = First row offset
    //event.rows = Number of rows per page
    //event.sortField = Field name to sort with
    //event.sortOrder = Sort order as number, 1 for asc and -1 for dec
    //filters: FilterMetadata object having field as key and filter value, filter matchMode as value
    
    //imitate db connection over a network
    console.log(event.first);
}

  ngOnInit() {
      this._tasksService.getTasks()
        .subscribe(tasksSource => {
          this.tasksSource = tasksSource;
          this.tasks = tasksSource.tasks;
      });
  }
  
}
