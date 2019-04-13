import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { NgModule }             from '@angular/core';
import { AuthGuard }                from './auth-guard.service';
import { LoginComponent } from './login/login.component';
import { KosongComponent } from './menu/kosong/kosong.component';

const appRoutes: Routes = [
    {
      path: 'login',
      component: LoginComponent
    },
    {
      path: 'menu',
      component: MenuComponent,
      // canActivate: [AuthGuard],
    },
    { path: '',   redirectTo: '/login', pathMatch: 'full' },
    // { path: '**',   redirectTo: '/login', pathMatch: 'full' },
    
  ];
  
  @NgModule({
    imports: [
      RouterModule.forRoot(
        appRoutes,
        {
        //   enableTracing: true, // <-- debugging purposes only
          
        }
      )
    ],
    exports: [
      RouterModule
    ],
    providers: [
     
    ]
  })
  export class AppRoutingModule { }


