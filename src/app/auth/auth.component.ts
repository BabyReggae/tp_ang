import { Component, OnInit } from '@angular/core';
declare var $:any;

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    



  }

  toggleLoginRegister( boardName ){
    var el = boardName == "Login" ? "Register" : "Login",
        el2 = boardName == "Login" ? "Login" : "Register"

    $('#'+el2).fadeToggle( 500 , function(){
      $('#'+el).fadeToggle( 500 );
    })
  }


}
