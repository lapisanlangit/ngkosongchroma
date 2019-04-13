import { NgModule } from '@angular/core';
import { MenuComponent } from './menu.component';
import { SharedModule } from '../shared/shared.module';
import { MenuRoutingModule } from './menu.routing';
import { KppnComponent } from './kppn/kppn.component';
import { SatkerComponent } from './satker/satker.component';
import { KppnFilterPipe } from './kppn/kppn.pipe';
import { KppnService } from './kppn/kppn.service';
import { SatkerFilterPipe } from './satker/satker.pipe';
import { SatkerService } from './satker/satker.service';
import { KosongComponent } from './kosong/kosong.component';
import { UploadComponent } from './upload/upload.component';
import { UploadService } from './upload/upload.service';



@NgModule({
  imports: [
    SharedModule,
    MenuRoutingModule
  ],
  declarations: [MenuComponent,
    KppnComponent,
    SatkerComponent,
    KppnFilterPipe,
    SatkerFilterPipe,
    KosongComponent,
    UploadComponent

  ],
  providers: [
    KppnService,
    SatkerService,
    UploadService
  ],
})
export class MenuModule { }
