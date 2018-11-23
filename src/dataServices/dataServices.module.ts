import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { TasksService } from './services/tasksService';

@NgModule({
  declarations: [
    
  ],
  imports: [
      HttpClientModule
  ],
  exports: [  ],
  providers: [ TasksService ]
})
export class DataServicesModule { }
