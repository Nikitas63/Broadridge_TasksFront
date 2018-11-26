import { Component } from '@angular/core';

import { TasksService } from '../../dataServices/services/tasksService';
import { Task, TaskModelStatus, TasksFilter } from '../../dataServices/clientModels/task';
import { LazyLoadEvent } from 'primeng/api';

@Component({
  selector: 'broad-tasks-component',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent {

  private _currentPage: number;
  private _currentSize: number;

  constructor(private _tasksService: TasksService) { }

  public availablePageSizes: number[] = [10, 20, 50, 100];

  public tasks: Task[];

  public totalRecords: number;

  public rowsNumber: number;

  public selectedTask: Task;

  public taskFilter: TasksFilter = TasksFilter.All;

  public ngOnInit() {
    this.getTasks(1, this.availablePageSizes[0]);
  }

  public filterTasks(filter: TasksFilter) {
    this.taskFilter = filter;
    this.getTasks(1, this.availablePageSizes[0], filter);
  }

  public loadTasksLazy(event: LazyLoadEvent) {
    this.rowsNumber = event.rows;

    var pageNumber = event.first / event.rows + 1;

    this.getTasks(pageNumber, event.rows);
  }

  public onTaskSelect(event: any) {
    if (event) {
      this.selectedTask = event.data;
    }
  }

  public completeTask(id: string) {
    this._tasksService.completeTask(id)
      .subscribe(result => {
        if (result) {
          var completedTask = this.tasks.find(t => t.Id === id);
          completedTask.Status = TaskModelStatus.Completed;
        }
      });
  }

  public deleteTask(id: string) {
    this._tasksService.deleteTask(id)
      .subscribe(() => {
        this.getTasks();
      });
  }

  private getTasks(page?: number, size?: number, filter?: TasksFilter) {
    if (!page) {
      page = this._currentPage;
    } else {
      this._currentPage = page;
    }

    if (!size) {
      size = this._currentSize;
    } else {
      this._currentSize = size;
    }

    if (!filter) {
      filter = this.taskFilter;
    }

    this.rowsNumber = size;

    this._tasksService.getTasks(page, size, filter)
      .subscribe(tasksSource => {
        this.tasks = tasksSource.tasks;
        this.totalRecords = tasksSource.paginationContext.totalRows;
      });
  }
}
