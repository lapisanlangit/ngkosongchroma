import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BaseComponent } from './base/base.component';
import { BaseService } from './base/base.service';
import { PesanComponent } from './pesan/pesan.component';
import { AjaxLoaderComponent } from './ajax/ajax-loader.component';
import { AjaxKecilComponent } from './ajax/ajax-kecil.component';
import { NodataComponent } from './nodata/nodata.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { httpInterceptorProviders } from './base/interceptor';
import { NgxPaginationModule } from 'ngx-pagination'; // <-- import the module
import { RibuanPipe } from './ribuan.pipe';
import { TglIndoPipe } from './tglindo.pipe';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    NgxPaginationModule
  ],
  declarations: [
    BaseComponent,
    PesanComponent,
    NodataComponent,
    AjaxLoaderComponent,
    AjaxKecilComponent,
    RibuanPipe,
    TglIndoPipe
  ],
  exports: [
    CommonModule,
    FormsModule,
    PesanComponent,
    BaseComponent,
    NodataComponent,
    HttpClientModule,
    AjaxKecilComponent,
    AjaxLoaderComponent,
    NgxPaginationModule,
    RibuanPipe,
    TglIndoPipe
  ],
  providers: [
    BaseService,
    httpInterceptorProviders,
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ]
})
export class SharedModule { }
