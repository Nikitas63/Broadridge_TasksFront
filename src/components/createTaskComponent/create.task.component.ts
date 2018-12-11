import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Task } from '../../dataServices/clientModels/task';
import { TasksService } from '../../dataServices/services/tasksService';

@Component({
  selector: 'broad-create-task-component',
  templateUrl: './create.task.component.html',
  styleUrls: ['./create.task.component.css']
})
/*
  Task creation component.
*/
export class CreateTaskComponent {

  private _saveAlreadyClicked: boolean = false;

  public task: Task = new Task();

  public get canSave(): boolean {
    return this.task.Name != null && this.task.Description != null
      && this.task.Priority > 0 && this.task.Priority < 100 && this.task.TimeToComplete > 0;
  }

  public get warningNeeded(): boolean {
    return !this.canSave && this._saveAlreadyClicked;
  }

  public get warningText(): string {
    if (this.task.Name == null || this.task.Name == '') {
      return 'Task name should be filled';
    }
    if (this.task.Description == null || this.task.Description == '') {
      return 'Task description should be filled';
    }
    if (!this.task.Priority || this.task.Priority <= 0 || this.task.Priority > 100) {
      return 'Task priority should be between 1 and 100';
    }
  }

  constructor(private _tasksService: TasksService,
              private _router: Router) { }

  public save() {
    this._saveAlreadyClicked = true;

    if (this.canSave) {
      this._tasksService.createTask(this.task)
        .subscribe(createdTask => {
          this._router.navigate([`/tasks/${createdTask.Id}`]);
        });
    }
  }
}
