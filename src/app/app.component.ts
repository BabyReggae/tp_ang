import { Component, OnInit } from '@angular/core';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { AppareilService } from './services/appareil.service';
import { AuthService } from './services/auth.service';
import { AuthComponent } from './auth/auth.component'
import { Subscription, Observable, interval } from 'rxjs';
import { NavigationEnd, Router, NavigationStart } from '@angular/router';


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
  //test inport fontawsome icons
    constructor(private authService: AuthService , private router: Router ){

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
  
    ngOnInit() {
      console.log('Mais tout a fais oui !')
      // testClass.testMethode();
      start();


      // const counter = interval(1000);
      // this.counterSubscription = counter.subscribe(
      //   (value) => {
      //     // console.log( value );
      //     this.secondes = value;
      //   },
      //   (error) => {
      //     console.log('Uh-oh, an error occurred! : ' + error);
      //   },
      //   () => {
      //     console.log('Observable complete!');
      //   }
      // );


    }
  
    ngOnDestroy() {
      console.log('enfaite non mais oui')
    }

    onLogOut(){
    
      let token : string = localStorage.getItem('token');
      this.authService.signOut( token );
      // this.AuthComponent.aut = this.authService.isAuth
    }


  // faThumbsUp = faThumbsUp;
  // title = "Posts Panel";
  // lastUpdate  = new Date();












}
