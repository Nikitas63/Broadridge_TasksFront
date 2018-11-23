import { Component } from '@angular/core';

import { MenuItem } from 'primeng/api';
import { TasksService } from '../../dataServices/services/tasksService';
import { Tasks } from '../../dataServices/clientModels/tasks';

@Component({
  selector: 'broad-menu-component',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  constructor(private _tasksService: TasksService) {
  }


  protected items: MenuItem[];
  protected tasks: Tasks;

  ngOnInit() {
      this.items = [
          {label: 'Add task form'},
          {label: 'Tasks list'}
      ];

      this._tasksService.getTasks()
        .subscribe(tasks => {
          this.tasks = tasks;
      });
  }
}
