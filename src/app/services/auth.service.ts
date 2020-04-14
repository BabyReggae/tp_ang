import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { newUser } from '../models/newUser.model';
import { loginUser } from '../models/loginUser.model';
import { Router } from '@angular/router';
import { AlertService } from '../alert';

declare var $:any;

@Injectable()
export class AuthService {

    constructor( private httpClient: HttpClient, private router: Router , protected alertService: AlertService ){}

    
    isAuth = false;
    alertOptions = {
        autoClose: true,
        keepAfterRouteChange: true
    };


    signIn( loginUser : loginUser ) {
        return new Promise(
            (resolve, reject) => {
            //api call to check userinformation validity
            this.httpClient
            .post('http://localhost:8080/api/user/log_user', { loginReq :  loginUser } )
            .subscribe( (data : any) => {
                if( data.token ){
                    this.isAuth = true;
                    //store token somewhere ? 
                    resolve( data );
                }else{
                    this.isAuth = false;
                    reject( data );//read error
                }

            });

            }   
        );
    }

    signOut( token : string  ) {

        return new Promise(
            (resolve, reject) => {
                console.log( token , "TOKEN BEFORE SEND " );

            this.httpClient
            .post('http://localhost:8080/api/user/unlog_user', { token :  token } )
            .subscribe( (data : any) => {
                this.isAuth = false;
                resolve(data);
            });

            }   
        );

        
    }

    register( newUser : newUser  ){
        this.httpClient
        .post('http://localhost:8080/api/user/add_user', { user :  newUser } )
        .subscribe((data : any) => {
            if( data.message === "" ) {
                this.alertService.success( 'Compte crée avec succes ! =)' , this.alertOptions );
                $('#Login , #Register ').toggle( 250 );
                return true;
            } 

            this.alertService.error( data.message , this.alertOptions );
            
        });
    }
}