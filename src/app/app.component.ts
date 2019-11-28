import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isAuth = false;
  appareils = ['grille-pain',"sardines","brioche"];
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
  onAllumer(){
      alert('tout est allumer =)');
  }

}
