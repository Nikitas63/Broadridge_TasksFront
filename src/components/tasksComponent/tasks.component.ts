import { Component } from '@angular/core';

import { LazyLoadEvent } from 'primeng/api';
import { Observable, timer } from 'rxjs';
import { map } from 'rxjs/operators';

import { TasksService } from '../../dataServices/services/tasksService';
import { Task, TaskModelStatus, TasksFilter } from '../../dataServices/clientModels/task';

@Component({
  selector: 'broad-tasks-component',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
/*
  Tasks component (contains paginated grid with tasks).
*/
export class TasksComponent {

  private _currentPage: number;
  private _currentSize: number;
  private _timer: Observable<number>;

  constructor(private _tasksService: TasksService) {
    this._timer = timer(0, 1000);
  }

  public availablePageSizes: number[] = [10, 20, 30];

  public tasks: Task[];

  public totalRecords: number;

  public rowsNumber: number;

  public sortValue: number;

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
    this.sortValue = event.sortOrder;
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
        if (this.selectedTask != null && this.selectedTask.Id == id) {
          this.selectedTask = null;
        }
      });
  }

  public refreshTasks() {
    this.getTasks();
  }

  private getTasks(page?: number, size?: number, filter?: TasksFilter, orderAsk?: boolean) {
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

    if (orderAsk == null) {
      orderAsk = this.sortValue > 0;
    }

    this.rowsNumber = size;

    this._tasksService.getTasks(page, size, filter, orderAsk)
      .subscribe(tasksSource => {
        this.tasks = tasksSource.tasks;
        this.tasks.forEach(t => {
          t.TimeToCompleteAsync = this.getTimeToCompleteAsync(t);
        });
        this.totalRecords = tasksSource.paginationContext.totalRows;
      });
  }

  private getTimeToCompleteAsync(task: Task): Observable<number> {
    return this._timer.pipe(map(() => {
        var nowDate = new Date();
        var dateDiff = nowDate.getTime() - task.CreatedDate.getTime();

        var residueTimeInSeconds = task.TimeToComplete - (dateDiff / 1000);

        return residueTimeInSeconds > 0 ? residueTimeInSeconds : 0;
    }));
  }
}
