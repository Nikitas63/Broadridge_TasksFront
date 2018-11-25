import { Component, Input } from '@angular/core';

import { Task } from '../../dataServices/clientModels/task';
import { TasksService } from '../../dataServices/services/tasksService';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'broad-task-details-component',
  templateUrl: './task.details.component.html',
  styleUrls: ['./task.details.component.css']
})
export class TaskDetailsComponent {

  private _sub: any;

  public taskId: string;

  @Input()
  public set task(value: Task) {
    this.loadedTask = value;
  }

 /* @Input()
  public set taskId(value: string) {
    if (this._tasksService) {
      this._tasksService.getTask(value)
        .subscribe(task => this.loadedTask = task);
    }
  }*/

  protected loadedTask: Task;

  constructor(private _tasksService: TasksService,
              private _router: Router,
              private _route: ActivatedRoute) { }

  public ngOnInit() {
    this._sub = this._route.params.subscribe(params => {
      console.log(params);
    });
  }

  public ngOnDestroy() {
    this._sub.unsubscribe();
  }

  protected navigate() {
    return this._router.navigate([`/tasks${this.loadedTask.Id}`]);
  }

}
