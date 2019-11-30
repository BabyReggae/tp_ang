import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = "Boonnsoir !";
  isAuth = false;
  lastUpdate = new Promise(

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
  );
  appareils = [
    {name : 'grille-pain',status : 0},
    {name : 'autregp' , status : 1},
    {name : 'jadore les gp',status : 0}
  ];

  statut = [0,1];
  constructor(){
    setTimeout( /*function(){
      console.log( "coucou" );
      this.isAuth = true;
      console.log( this.isAuth );
    } */()=>{
      console.log( "coucou" );
      this.isAuth = true;
      console.log( this.isAuth );
    } , 2000);
  }
  onToggleStat(){
      this.appareils.forEach(e => {
        if(e.status === 1) e.status = 0; else e.status = 1; 
      });
  }

}
