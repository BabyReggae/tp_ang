import { Component, OnInit } from '@angular/core';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { AppareilService } from './services/appareil.service';
import { AuthService } from './services/auth.service';
import { AuthComponent } from './auth/auth.component'
import { Subscription, Observable, interval } from 'rxjs';


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
    constructor(private authService: AuthService){

    }

    
    secondes: number;
    counterSubscription: Subscription;
  
    ngOnInit() {

      // testClass.testMethode();
      start();


      const counter = interval(1000);
      this.counterSubscription = counter.subscribe(
        (value) => {
          // console.log( value );
          this.secondes = value;
        },
        (error) => {
          console.log('Uh-oh, an error occurred! : ' + error);
        },
        () => {
          console.log('Observable complete!');
        }
      );


    }
  
    ngOnDestroy() {
      this.counterSubscription.unsubscribe();
    }

    onLogOut(){
    
      let token : string = localStorage.getItem('token');
      this.authService.signOut( token );
      // this.AuthComponent.aut = this.authService.isAuth
    }


  // faThumbsUp = faThumbsUp;
  // title = "Posts Panel";
  // lastUpdate  = new Date();

  // posts = [
  //   {  
  //     title: "Premier post",  
  //     content: " Loremipsum dolor sit amet et j'en passe d'autre parce oui moi pas parler le lorem dude maius fallais   Loremipsum dolor sit amet et j'en passe d'autre parce oui moi pas parler le lorem dude maius fallais  Loremipsum dolor sit amet et j'en passe d'autre parce oui moi pas parler le lorem dude maius fallais  Loremipsum dolor sit amet et j'en passe d'autre parce oui moi pas parler le lorem dude maius fallais  Loremipsum dolor sit amet et j'en passe d'autre parce oui moi pas parler le lorem dude maius fallais bien ecrire uyn truc quiu fasse + que deux lignes...",  
  //     loveIts: 1,  
  //     created_at: new Date()
  //   },
  //   {  
  //     title: "Other post",  
  //     content: "Loremipsum dolor sit amet et j'en passe d'autre parce oui moi pas parler le lorem dude maius fallais bien ecrire uyn truc quiu fasse + que deux lignes...",  
  //     loveIts: -1,  
  //     created_at: new Date()
  //   },
  //   {  
  //     title: "Last post",  
  //     content: "Loremipsum dolor sit amet et j'en passe d'autre parce oui moi pas parler le lorem dude maius fallais bien ecrire uyn truc quiu fasse + que deux lignes...",  
  //     loveIts: 0,  
  //     created_at: new Date()
  //   }
  // ]


  /*lastUpdate = new Promise(

    ( resolve, reject ) => {
      var mysql = require('mysql');

      var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: '2p2g'
      });
      
      connection.connect();
      
      connection.query('SELECT * from users', function(error, results, fields) {
        if (error) throw error;
        console.log( results );
        
      });
      
      connection.end();
    }
  );*/
    // $:any;



  // appareils:any[];  










}
