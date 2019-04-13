import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from '../shared/base/base.component';
import { LoginService } from './login.service';
import { Store } from '@ngxs/store';
import { LoginUser } from '../store/actions/user.action';


declare var jQuery: any;

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent extends BaseComponent implements OnInit {

    public iUserId: string;
    public iPassword: string;


    constructor(private router: Router, private loginservice: LoginService, private store: Store) {
        super();
    }

    ngOnInit() {

        document.body.className = '"hold-transition login-page';
        this.ajaxKecil = 1;
    }

    /**
     * login
     */
    public login() {
        

        var nilaiSimpan = {

            "userid": this.iUserId,
            "password": this.iPassword

        };

        this.ajaxKecil = 0;
        this.loginservice.login(nilaiSimpan)
            .subscribe(
                data => {
                    if (data[0].token === "kosong") {

                        this.setPesan = {
                            "judulPesan": "Warning",
                            "isiPesan": "Isian User/Password tidak sesuai",
                            "jenisPesan": 1
                        };
                        setTimeout(function () {
                            jQuery('#ctnpesan').modal('show');
                        }, 500);
                        this.ajaxKecil = 1;
                        this.loginservice.isLoggedIn = false;
                        return;
                    } else {
                        
                        this.store.dispatch(new LoginUser(
                            {
                                kdsatker: data[0].kdsatker,
                                kdanak: data[0].kdanak,
                                kdsubanak: data[0].kdsubanak,
                                token: data[0].token,
                            }
                        ))
                        this.loginservice.isLoggedIn = true;
                        localStorage.setItem('kdsatker', data[0].kdsatker);
                        localStorage.setItem('token', data[0].token);
                        localStorage.setItem('kdanak', "");
                        localStorage.setItem('kdsubanak', "");
                        let link = ['/menu'];
                        this.router.navigate(['/menu']);
                    }
                },
                error => {
                    // console.log(error);
                    this.setPesan = {
                        "judulPesan": "Warning",
                        "isiPesan": "Isian User/Password tidak sesuai",
                        "jenisPesan": 1
                    };
                    setTimeout(function () {
                        jQuery('#ctnpesan').modal('show');
                    }, 500);
                    this.ajaxKecil = 1;
                }
            );




    }



}
