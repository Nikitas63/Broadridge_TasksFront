import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Task } from '../../dataServices/clientModels/task';
import { TasksService } from '../../dataServices/services/tasksService';

@Component({
  selector: 'broad-task-details-component',
  templateUrl: './task.details.component.html',
  styleUrls: ['./task.details.component.css']
})
/*
  Component with task details.
*/
export class TaskDetailsComponent {

  private _sub: any;
  
  public loadSingleTask: boolean;
  public loadedTask: Task;

  @Input()
  public set task(value: Task) {
    this.loadedTask = value;
    this.loadSingleTask = false;
  }

  constructor(private _tasksService: TasksService,
              private _route: ActivatedRoute,
              private _router: Router) { }

  public ngOnInit() {
    this._sub = this._route.params.subscribe(params => {
      if (this._tasksService && params && params.taskId) {
        this._tasksService.getTask(params.taskId)
          .subscribe(task => {
            this.loadedTask = task;
            this.loadSingleTask = true;
          });
      }
    });
  }

  public ngOnDestroy() {
    this._sub.unsubscribe();
  }

  protected navigate() {
    return this._router.navigate([`/tasks/${this.loadedTask.Id}`]);
  }
}
