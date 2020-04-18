import { Component, OnInit } from '@angular/core';
import { filter, pairwise } from 'rxjs/operators';


import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';

import { AppareilService } from './services/appareil.service';
import { AuthService } from './services/auth.service';


import { AuthComponent } from './auth/auth.component';
import { Subscription, Observable, interval } from 'rxjs';
import { NavigationEnd, Router, NavigationStart, RoutesRecognized } from '@angular/router';
import { MenuService } from './services/menu.service';
import { AlertService } from './alert';



import { faCoins } from '@fortawesome/free-solid-svg-icons';



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
    
    faCoins = faCoins;
    playerGold:number;

    MenuService: Subscription;
    constructor(private authService: AuthService , private router: Router, private menuService : MenuService,  protected alertService: AlertService ){

      router.events.subscribe((val : any) => {
        // see also 
        if( val instanceof NavigationEnd )  {
          this.authService.session_watcher( val.url );
        }

        
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

      this.router.events
      .pipe(filter((evt: any) => evt instanceof RoutesRecognized), pairwise())
      .subscribe((events: RoutesRecognized[]) => {
        this.menuService.set_newMenuBoard( { prev : events[0].urlAfterRedirects, cur : events[1].urlAfterRedirects }  );
      });


      this.menuSubscription = this.menuService.menuSubject.subscribe( 
        ( path: any[] ) => {
          this.menuPath = path;
          // this.menuService.set_newMenuBoard( path );
        }
      )
      this.menuService.emitMenuSubject();

      //load main board related data // TRIGGER ON_SESSION CONNECT ! 
      this.authService.playerGold().then((gold)=>{
        this.updatePlayerGold( gold );
      })

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

    updatePlayerGold( curGold ){
      this.playerGold = curGold;
    }

  // faThumbsUp = faThumbsUp;
  // title = "Posts Panel";
  // lastUpdate  = new Date();












}
