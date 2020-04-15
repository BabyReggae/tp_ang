import { Component, OnInit } from '@angular/core';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';

import { AppareilService } from './services/appareil.service';
import { AuthService } from './services/auth.service';


import { AuthComponent } from './auth/auth.component';
import { Subscription, Observable, interval } from 'rxjs';
import { NavigationEnd, Router, NavigationStart } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { MenuService } from './services/menu.service';
import { AlertService } from './alert';



//parce que c'est pas drole sinon
declare var $:any;
declare var testClass:any;
declare var start:any;//FROM BOBBLES JS FILE





@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent implements OnInit {
    MenuService: Subscription;
  //test inport fontawsome icons
    constructor(private authService: AuthService , private router: Router, private menuService : MenuService,  protected alertService: AlertService ){

      router.events.subscribe((val : any) => {
        // see also 
        if( val instanceof NavigationEnd )  this.authService.session_watcher( val.url );
      // NavigationEnd
      // NavigationCancel
      // NavigationError
      // RoutesRecognized
    });


    }

    secondes: number;
    counterSubscription: Subscription;
    menuPath : Array<any>;
    menuSubscription : Subscription;
  
    ngOnInit() {

      this.menuSubscription = this.menuService.menuSubject.subscribe( 
        ( path: any[] ) => {
          this.menuPath = path;
        }
      )
      this.menuService.emitMenuSubject();

      //mail validation check

      //js game init
      start();
    }
  
    ngOnDestroy() {
      console.log('app componnent triggered ngOnDestroy')
    }

    onLogOut(){
      let token : string = localStorage.getItem('token');
      this.authService.signOut( token );
    }


  // faThumbsUp = faThumbsUp;
  // title = "Posts Panel";
  // lastUpdate  = new Date();












}
