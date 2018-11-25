import { Component } from '@angular/core';

import { TasksService } from '../../dataServices/services/tasksService';
import { TasksSource } from '../../dataServices/clientModels/tasksSource';
import { Task, TaskModelStatus } from '../../dataServices/clientModels/task';
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

  protected availablePageSizes: number[] = [10, 20, 50, 100];

  protected tasks: Task[];

  protected totalRecords: number;

  protected rowsNumber: number;

  protected loadTasksLazy(event: LazyLoadEvent) {
    this.rowsNumber = event.rows;

    var pageNumber = event.first / event.rows + 1;

    this.getTasks(pageNumber, event.rows);
  }

  protected completeTask(id: string) {
    this._tasksService.completeTask(id)
      .subscribe(result => {
        if (result) {
          var completedTask = this.tasks.find(t => t.Id === id);
          completedTask.Status = TaskModelStatus.Completed;
        }
      });
  }

  protected deleteTask(id: string) {
    this._tasksService.deleteTask(id)
      .subscribe(() => {
        this.getTasks();
      });
  }

  public ngOnInit() {
      this.getTasks(1, this.availablePageSizes[0]);
  }

  private getTasks(page?: number, size?: number) {
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

    this.rowsNumber = size;

    this._tasksService.getTasks(page, size)
      .subscribe(tasksSource => {
        this.tasks = tasksSource.tasks;
        this.totalRecords = tasksSource.paginationContext.totalRows;
      });
  }
}
