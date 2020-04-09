import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
declare var $:any;

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  authStatus : boolean;

  constructor( private authService: AuthService, private router: Router ) { }

  ngOnInit() {
    



  }

  onSignIn(){
    this.authService.signIn().then( 
      ()=>{
        console.log('connected');
        this.authStatus = this.authService.isAuth;
        this.router.navigate( ['appareils'] )
      }
    )
  }

  onSignOut(){
    this.authService.signOut();
    this.authStatus = this.authService.isAuth
  }


  toggleLoginRegister( boardName ){
    var el = boardName == "Login" ? "Register" : "Login",
        el2 = boardName == "Login" ? "Login" : "Register"

    $('#'+el2).fadeToggle( 500 , function(){
      $('#'+el).fadeToggle( 500 );
    })
  }


}
