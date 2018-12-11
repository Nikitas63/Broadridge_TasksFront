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

  public daysToComplete: number = 0;
  public hoursToComplete: number = 0;
  public minutesToComplete: number = 0;
  public secondsToComplete: number = 0;

  public get warningNeeded(): boolean {
    return this.warningText != null && this._saveAlreadyClicked;
  }

  public get warningText(): string {
    if (this.task.Name == null || this.task.Name == '') {
      return 'Task name should be filled';
    }
    if (this.task.Description == null || this.task.Description == '') {
      return 'Task description should be filled';
    }
    if (!this.task.Priority || this.task.Priority < 0 || this.task.Priority > 100) {
      return 'Task priority should be between 1 and 100';
    }
    if (this.daysToComplete == null || this.daysToComplete < 0 || this.daysToComplete > 30) {
      return 'Task days to complete should be between 0 and 30';
    }
    if (this.hoursToComplete == null || this.hoursToComplete < 0 || this.hoursToComplete > 24) {
      return 'Task hours to complete should be between 0 and 24';
    }
    if (this.minutesToComplete == null || this.minutesToComplete < 0 || this.minutesToComplete > 60) {
      return 'Task minutes to complete should be between 0 and 60';
    }
    if (this.secondsToComplete == null || this.secondsToComplete < 0 || this.secondsToComplete > 60) {
      return 'Task seconds to complete should be between 0 and 60';
    }
    if (this.getTimeToComplete() <= 0 ) {
      return 'Time to complete should be greater than zero';
    }

    return null;
  }

  constructor(private _tasksService: TasksService,
              private _router: Router) { }

  public save() {
    this._saveAlreadyClicked = true;

    if (this.warningText == null) {
      this.task.TimeToComplete = this.getTimeToComplete();
      this._tasksService.createTask(this.task)
        .subscribe(createdTask => {
          this._router.navigate([`/tasks/${createdTask.Id}`]);
        });
    }
  }

  private getTimeToComplete(): number {
    var result = 0;
    if (this.secondsToComplete) {
      result += this.secondsToComplete;
    }
    if (this.minutesToComplete) {
      result += this.minutesToComplete * 60;
    }
    if (this.hoursToComplete) {
      result += this.hoursToComplete * 60 * 60;
    }
    if (this.daysToComplete) {
      result += this.daysToComplete * 60 * 60 * 24;
    }

    return result;
  }
}
