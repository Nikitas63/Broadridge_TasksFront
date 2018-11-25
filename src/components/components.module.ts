import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuComponent } from './menuComponent/menu.component';

import {InputTextModule, DataTableModule, ButtonModule, DialogModule, CheckboxModule, DataListModule, MenubarModule, MenuModule,
  InputTextareaModule, PanelModule, DropdownModule} from 'primeng/primeng';
import { DataServicesModule } from '../dataServices/dataServices.module';
import { TasksComponent } from './tasksComponent/tasks.component';
import { TaskDetailsComponent } from './taskDetailsComponent/task.details.component';

@NgModule({
  declarations: [
    MenuComponent,
    TasksComponent,
    TaskDetailsComponent
  ],
  imports: [
      CommonModule,

      // PrimeNG
      InputTextModule, DataTableModule, ButtonModule, DialogModule,
      CheckboxModule, DataListModule, MenubarModule, MenuModule, InputTextareaModule, PanelModule, DropdownModule,

      DataServicesModule
  ],
  exports: [ MenuComponent, TasksComponent, TaskDetailsComponent ],
  providers: []
})
export class ComponentsModule { }
