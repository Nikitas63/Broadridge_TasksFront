import { Component } from '@angular/core';

import { MenuItem } from 'primeng/api';

@Component({
  selector: 'broad-menu-component',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  items: MenuItem[];

  ngOnInit() {
      this.items = [
          {label: 'New', icon: 'pi pi-fw pi-plus'},
          {label: 'Open', icon: 'pi pi-fw pi-download'},
          {label: 'Undo', icon: 'pi pi-fw pi-refresh'}
      ];
  }
}
