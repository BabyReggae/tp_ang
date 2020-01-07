import { Component, OnInit } from '@angular/core';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { AppareilService } from './services/appareil.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent implements OnInit {
  //test inport fontawsome icons
  
  faThumbsUp = faThumbsUp;
  title = "Posts Panel";
  isAuth = true;
  lastUpdate  = new Date();
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

  appareils:any[];  

  posts = [
    {  
      title: "Premier post",  
      content: " Loremipsum dolor sit amet et j'en passe d'autre parce oui moi pas parler le lorem dude maius fallais   Loremipsum dolor sit amet et j'en passe d'autre parce oui moi pas parler le lorem dude maius fallais  Loremipsum dolor sit amet et j'en passe d'autre parce oui moi pas parler le lorem dude maius fallais  Loremipsum dolor sit amet et j'en passe d'autre parce oui moi pas parler le lorem dude maius fallais  Loremipsum dolor sit amet et j'en passe d'autre parce oui moi pas parler le lorem dude maius fallais bien ecrire uyn truc quiu fasse + que deux lignes...",  
      loveIts: 1,  
      created_at: new Date()
    },
    {  
      title: "Other post",  
      content: "Loremipsum dolor sit amet et j'en passe d'autre parce oui moi pas parler le lorem dude maius fallais bien ecrire uyn truc quiu fasse + que deux lignes...",  
      loveIts: -1,  
      created_at: new Date()
    },
    {  
      title: "Last post",  
      content: "Loremipsum dolor sit amet et j'en passe d'autre parce oui moi pas parler le lorem dude maius fallais bien ecrire uyn truc quiu fasse + que deux lignes...",  
      loveIts: 0,  
      created_at: new Date()
    }
  ]

  constructor( private appareilService: AppareilService ){
    setTimeout( /*function(){
      console.log( "coucou" );
      this.isAuth = true;
      console.log( this.isAuth );
    } */()=>{
      console.log( "timeout check " );
      //this.isAuth = true;
      //console.log( this.isAuth );
    } , 2000);
  }

  ngOnInit() {
    this.appareils = this.appareilService.appareils;
  }

  onToggleStat(){
      this.appareils.forEach(e => {
        if(e.status === 1) e.status = 0; else e.status = 1; 
      });
  }

  onAllumer() {
    this.appareilService.switchOnAll();
  }

  onEteindre() {
      if(confirm('Etes-vous sûr de vouloir éteindre tous vos appareils ?')) {
        this.appareilService.switchOffAll();
      } else {
        return null;
      }
  }




}
