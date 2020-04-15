import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { newUser } from '../models/newUser.model';
import { loginUser } from '../models/loginUser.model';
import * as sha256 from 'js-sha256';
import { AlertService } from '../alert';

declare var $:any;

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})


export class AuthComponent implements OnInit {

  authStatus : boolean;
  alertOptions = {
    autoClose: true,
    keepAfterRouteChange: true
  };

  constructor( private authService: AuthService, private router: Router , protected alertService: AlertService ) { }

  ngOnInit() {
    //maybe check for session storage and log if data are available and true
    this.alertService.success( 'App refresh !' , this.alertOptions );

  }

  onSignIn( form : NgForm ){

    const username = form.value.username;
    const pwd = sha256.sha256( form.value.pwd );

    this.authService.signIn(  new loginUser(  username , pwd ) )
    .then( 
      (suc : any ) => {

        localStorage.setItem('token', suc.token );
      
        this.authStatus = this.authService.isAuth;

        this.alertService.success( 'Welcome buddy !' , this.alertOptions );
        this.authService.isValidate( suc.token );
        this.router.navigate( ['sologame'] );

      }
    )
    .catch( (err : any ) => {
      console.log( err );
    })
  }



  toggleLoginRegister( boardName : any ){
    var el = boardName == "Login" ? "Register" : "Login",
        el2 = boardName == "Login" ? "Login" : "Register"

    $('#'+el2).fadeToggle( 500 , function(){
      $('#'+el).fadeToggle( 500 );
    })
  }

  onSubmit(form: NgForm) {
    console.log( form.value.pwd );

    const username = form.value.username;
    const email = form.value.email;
    const pwd = sha256.sha256( form.value.pwd );
    const pwdRepeat = sha256.sha256( form.value.pwdRepeat );
    
    if(  username == '' ){
      alert('aucun username fourni');
      return false;
    }
    if( pwd !== pwdRepeat ){
      alert('les pwd ne correspondent pas ! ');
      return false;
    }

    console.log( form.value );

    let testUser : newUser = new newUser( username, email, pwd );
    this.authService.register( testUser );
    
  }


}
