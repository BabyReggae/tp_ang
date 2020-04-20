import { Component, OnInit, Input, Type } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ModalService } from '../services/modal.service';
import { modal } from '../models/modal.model';
import { Validators, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { User } from '../models/User.model';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})

export class SettingsComponent implements OnInit {

  constructor( private httpClient : HttpClient, private modalService: ModalService) { }

  @Input() nickname:string;
  @Input() email:string;
  user:User = new User();
  settingsSubscription : Subscription;

  ngOnInit() {
    console.log('COMPNENT START INIT ');
    
    this.settingsSubscription = this.modalService.userSubject.subscribe
    ( 
      ( data: Array<User> ) => {
        this.user = data[0];
      }
    )
    
    this.modalService.reloadUserData();

  }


  editNickName( field:any, value:any ){

    let fitModal = new modal( "Settings" , "Please, write the new value below ", field, value );
    this.modalService.print( fitModal );

  }

  editEmail(field:any, value:any ){

    let fitModal = new modal( "Settings" , "Please, make sure to respect @mail format", field, value );
    this.modalService.print( fitModal );
  }

  editPwd(field:any, value:any ){

    let fitModal = new modal( "Password" , "Please, fill with your CURRENT password", field, value );
    this.modalService.print( fitModal );
  }


}
