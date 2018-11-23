import { NgModule } from '@angular/core';

import { MenuComponent } from './menuComponent/menu.component';

import {InputTextModule, DataTableModule, ButtonModule, DialogModule, CheckboxModule, DataListModule, MenubarModule, MenuModule} from 'primeng/primeng';
import { DataServicesModule } from '../dataServices/dataServices.module';

@NgModule({
  declarations: [
    MenuComponent
  ],
  imports: [
      // PrimeNG
      InputTextModule, DataTableModule, ButtonModule, DialogModule,
      CheckboxModule, DataListModule, MenubarModule, MenuModule,

      DataServicesModule
  ],
  exports: [ MenuComponent ],
  providers: []
})
export class ComponentsModule { }
