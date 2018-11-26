import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {InputTextModule, DataTableModule, ButtonModule, DialogModule, CheckboxModule, DataListModule, MenubarModule, MenuModule,
  InputTextareaModule, PanelModule, DropdownModule, FieldsetModule} from 'primeng/primeng';

import { MenuComponent } from './menuComponent/menu.component';
import { DataServicesModule } from '../dataServices/dataServices.module';
import { TasksComponent } from './tasksComponent/tasks.component';
import { TaskDetailsComponent } from './taskDetailsComponent/task.details.component';
import { MainTasksComponent } from './mainTasksComponent/main.tasks.component';
import { CreateTaskComponent } from './createTaskComponent/create.task.component';


@NgModule({
  declarations: [
    MenuComponent,
    TasksComponent,
    TaskDetailsComponent,
    MainTasksComponent,
    CreateTaskComponent
  ],
  imports: [
      // Angular
      CommonModule, FormsModule,

      // PrimeNG
      InputTextModule, DataTableModule, ButtonModule, DialogModule, FieldsetModule,
      CheckboxModule, DataListModule, MenubarModule, MenuModule, InputTextareaModule, PanelModule, DropdownModule,

      DataServicesModule
  ],
  exports: [ MenuComponent, TasksComponent, TaskDetailsComponent, MainTasksComponent, CreateTaskComponent ],
  providers: []
})
export class ComponentsModule { }
