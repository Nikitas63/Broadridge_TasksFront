import { Component, Output, EventEmitter } from '@angular/core';

import { MenuItem } from 'primeng/api';

import { MenuItemEnum } from './menuItemEnum';

@Component({
  selector: 'broad-menu-component',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
/*
  Menu component.
*/
export class MenuComponent {
  private _activeMenu: MenuItemEnum = MenuItemEnum.Tasks;

  @Output()
  public activeMenu: EventEmitter<MenuItemEnum> = new EventEmitter<MenuItemEnum>();

  public items: MenuItem[];

  public get menuStyle(): string {
    return this._activeMenu == MenuItemEnum.Tasks ? 'menucus-first-selected' : 'menucus-second-selected';
  }

  ngOnInit() {
    this.items = [
      {
        label: 'Tasks list', command: (onclick) => {
          this._activeMenu = MenuItemEnum.Tasks;
          this.activeMenu.emit(this._activeMenu)
        }
      },
      {
        label: 'Add task form', command: (onclick) => {
          this._activeMenu = MenuItemEnum.CreateTask;
          this.activeMenu.emit(this._activeMenu);
        }
      }
    ];
  }
}
