import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './menu.component';
import { KppnComponent } from './kppn/kppn.component';
import { SatkerComponent } from './satker/satker.component';
import { KosongComponent } from './kosong/kosong.component';
import { UploadComponent } from './upload/upload.component';
import { AuthGuard } from '../auth-guard.service';


const MenuRoutes: Routes = [
    {
        path: 'menu',
        component: MenuComponent,
        // canActivateChild: [AuthGuard],
        children: [
            { path: 'satker', component: SatkerComponent },
            { path: 'kppn', component: KppnComponent },
            { path: 'upload', component: UploadComponent },
            { path: '**', component: KosongComponent }
        ]

    }
];

@NgModule({
    imports: [
        RouterModule.forChild(MenuRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class MenuRoutingModule { }


