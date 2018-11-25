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

  private availablePageSizes: number[] = [25, 50];

  protected tasks: Task[];

  protected totalRecords: number;

  protected loadTasksLazy(event: LazyLoadEvent) {
    //in a real application, make a remote request to load data using state metadata from event
    //event.first = First row offset
    //event.rows = Number of rows per page
    //event.sortField = Field name to sort with
    //event.sortOrder = Sort order as number, 1 for asc and -1 for dec
    //filters: FilterMetadata object having field as key and filter value, filter matchMode as value
    
    //imitate db connection over a network


    var pageNumber = event.first / event.rows + 1;

    this.getTasks(pageNumber, event.rows);
}

  public ngOnInit() {
      this.getTasks(1, this.availablePageSizes[0]);
  }

  private getTasks(page: number, size: number) {
    this._tasksService.getTasks(page, size)
      .subscribe(tasksSource => {
        this.tasks = tasksSource.tasks;
        this.totalRecords = tasksSource.paginationContext.totalRows;
      });
  }

  
}
