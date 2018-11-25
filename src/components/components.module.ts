import { NgModule } from '@angular/core';

import { MenuComponent } from './menuComponent/menu.component';

import {InputTextModule, DataTableModule, ButtonModule, DialogModule, CheckboxModule, DataListModule, MenubarModule, MenuModule,
  InputTextareaModule, PanelModule, DropdownModule} from 'primeng/primeng';
import { DataServicesModule } from '../dataServices/dataServices.module';
import { TasksComponent } from './tasksComponent/tasks.component';

@NgModule({
  declarations: [
    MenuComponent,
    TasksComponent
  ],
  imports: [
      // PrimeNG
      InputTextModule, DataTableModule, ButtonModule, DialogModule,
      CheckboxModule, DataListModule, MenubarModule, MenuModule, InputTextareaModule, PanelModule, DropdownModule,

      DataServicesModule
  ],
  exports: [ MenuComponent, TasksComponent ],
  providers: []
})
export class ComponentsModule { }
