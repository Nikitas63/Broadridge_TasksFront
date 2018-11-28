import { Component } from '@angular/core';

import { MenuItemEnum } from '../menuComponent/menuItemEnum';

@Component({
  selector: 'broad-main-tasks-component',
  templateUrl: './main.tasks.component.html',
  styleUrls: ['./main.tasks.component.css']
})
/*
  Main layout component.
*/
export class MainTasksComponent {

  protected activeMenuItem: MenuItemEnum = MenuItemEnum.Tasks;

  public get isTasksMenuActive(): boolean {
    return this.activeMenuItem === MenuItemEnum.Tasks;
  }

  public activateMenu(activeMenuItem: MenuItemEnum) {
    this.activeMenuItem = activeMenuItem;
  }
}
