import { Component, Output, EventEmitter } from '@angular/core';

import { MenuItem } from 'primeng/api';
import { TasksService } from '../../dataServices/services/tasksService';
import { MenuItemEnum } from './menuItemEnum';

@Component({
  selector: 'broad-menu-component',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  constructor(private _tasksService: TasksService) {
  }

  @Output()
  public activeMenu: EventEmitter<MenuItemEnum> = new EventEmitter<MenuItemEnum>();

  public items: MenuItem[];

  ngOnInit() {
      this.items = [
          {label: 'Tasks list' , command: (onclick)=> {this.activeMenu.emit(MenuItemEnum.Tasks);}},
          {label: 'Add task form', command: (onclick)=> {this.activeMenu.emit(MenuItemEnum.CreateTask);}}
      ];
  }
}
