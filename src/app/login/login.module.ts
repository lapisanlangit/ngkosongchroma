import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './login.component';
import { LoginService } from './login.service';
import { AuthGuard } from '../auth-guard.service';



@NgModule({
  imports: [
    SharedModule
  ],
  exports: [
    SharedModule
  ],
  
  declarations: [LoginComponent],
  providers:[
    AuthGuard,
    LoginService
  ]
})
export class LoginModule { }
