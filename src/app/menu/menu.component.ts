import { Component, OnInit } from '@angular/core';
import { Store,Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { User } from '../store/models/User';
import { UserState } from '../store/state/user.state';
import { LoginUser } from '../store/actions/user.action';
import { Router } from '@angular/router';

declare var $;

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  // @Select(UserState.getUsers) users$: Observable<User>
  

  // users$: Observable<User>
  constructor(private store: Store,private router:Router) { }

  ngOnInit() {


    // this.users$ = this.store.select(state => state.usernya.users);
    // this.users$.subscribe(data=>{
    //   console.log(data[0].token)
    // })
    document.body.className = 'hold-transition skin-blue sidebar-mini';
    $(document).ready(function () {
      $('.sidebar-menu').tree()
    })

  }

  public logout() {
    localStorage.clear();
    location.reload();
    this.router.navigate(['/']);

  }

}
