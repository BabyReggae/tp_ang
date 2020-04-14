import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { newUser } from '../models/newUser.model';
import { loginUser } from '../models/loginUser.model';
import { Router } from '@angular/router';
import { AlertService } from '../alert';
import { promise } from 'protractor';

declare var $:any;

@Injectable()
export class AuthService {

    constructor( private httpClient: HttpClient, private router: Router , protected alertService: AlertService ){}

    
    isAuth = false;
    alertOptions = {
        autoClose: true,
        keepAfterRouteChange: true
    };


    session_watcher( routerEventInfo : any ){
        let connexionToken:any = localStorage.getItem('token');
        //check if exist 
        let tokenIsValid = new Promise(
            (resolve, reject) => {
                this.httpClient
                .post('http://localhost:8080/api/user/ask_tokenValidity', { token :  connexionToken } )
                .subscribe( (data : any) => {
                    console.log( "Data from token auto check => " , data );
                    if( data ) resolve(routerEventInfo); else reject();
                });

            }   
        );

        tokenIsValid
        .then(( currentRoute : string )=>{
            this.isAuth = true;
            if( ['/auth' , '', '/'].includes( currentRoute) ) this.router.navigate(['/appareils']);
        })
        .catch(()=>{
            this.isAuth = false;
        })
        //check if expiration timed out

        //trigger isAuth = true if previous step ok 
    }

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
                console.log( data );
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

    validation( token : string ){
        return new Promise( (resolve, reject) => {

            this.httpClient
            .get('http://localhost:8080/api/user/validation_user?token='+ token )
            .subscribe((data : any) => {
    
                // if( data.message === "" ) {
                //     this.alertService.success( 'Compte crée avec succes ! =)' , this.alertOptions );
                //     return true;
                // } 
    
                // this.alertService.error( data.message , this.alertOptions );
                console.log(" data reveive by ang after get on acc validation => " ,  data );
                resolve( data );
                // if( 1 == 2 ) reject(  data );
    
    
            });

        });



    }
}