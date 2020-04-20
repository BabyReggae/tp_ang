import { Component, OnInit } from '@angular/core';
import { filter, pairwise } from 'rxjs/operators';

import { AppareilService } from './services/appareil.service';
import { AuthService } from './services/auth.service';
import { AuthComponent } from './auth/auth.component';

import { Subscription, Observable, interval } from 'rxjs';
import { NavigationEnd, Router, NavigationStart, RoutesRecognized } from '@angular/router';
import { MenuService } from './services/menu.service';
import { AlertService } from './alert';

import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { faCoins } from '@fortawesome/free-solid-svg-icons';
import { ModalService } from './services/modal.service';
import { modal } from './models/modal.model';



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
    
    modal:any = { title :"default" ,bodyText :"default" ,inputLabel : "default",display : "false"};
    faCoins = faCoins;
    playerGold:number;
    MenuService: Subscription;

    constructor(
      private authService: AuthService , 
      private router: Router, 
      private menuService : MenuService,
      private modalService:ModalService, 
      protected alertService: AlertService,
    ){

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

    menuPath : Array<any>;
    menuSubscription : Subscription;
    modalSubscription : Subscription;
  
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
      
      this.modalSubscription = this.modalService.modalSubject.subscribe
      ( 
        ( data: any[] ) => {
          this.modal = data[0];
        }
      )
      //this.modalService.emitModalSubject();
      // this.modalService.print( new modal( "Welcome", "Pls, fill the below input with your 'Player Name' =) ", "NickName" ) );


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

    updatePlayerGold( curGold:any ){
      this.playerGold = curGold;
    }


  // faThumbsUp = faThumbsUp;
  // title = "Posts Panel";
  // lastUpdate  = new Date();












}
