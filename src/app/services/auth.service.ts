import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { newUser } from '../models/newUser.model';
import { loginUser } from '../models/loginUser.model';
import { Router } from '@angular/router';
import { AlertService } from '../alert';
import { promise } from 'protractor';
import { ModalService } from './modal.service';
import { modal } from '../models/modal.model';

declare var $:any;

@Injectable()
export class AuthService {

    constructor( private httpClient: HttpClient, private router: Router , protected alertService: AlertService, private modalService:ModalService ){}

    
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
            this.onLoginSuccess();

            if( currentRoute === '/logout' ){
                let token : string = localStorage.getItem('token');
                let tokenDel = this.signOut( token );
                tokenDel.then((v)=>{ this.router.navigate(['/auth'])  });
            }else if( ['/auth' , '', '/'].includes( currentRoute) ) this.router.navigate(['/sologame']);
            
            
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
                    this.onLoginSuccess();
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
                resolve( data );
            });
        });
    }

    isValidate( token : string ){
        let emailIsValid = new Promise( (resolve, reject) => {

            this.httpClient
            .get('http://localhost:8080/api/user/emailIsValid_user?token='+ token )
            .subscribe((data : any) => {
                console.log('HCECK DAT OUT >> ', data, token );
                if( data ) resolve( data );else reject( data );
            });
        });

        emailIsValid
        .then((val)=>{
            if(val) console.log('email a été valider'); else this.alertService.error('L\'adresse email liée à ce compte n\'a toujours pas été valider ! ');
        })
        .catch((val)=>{
            this.alertService.error('L\'adresse email liée à ce compte n\'a toujours pas été valider ! ');
        });


    }

    playerGold(){
        return new Promise((resolve,reject)=>{
            let token : string = localStorage.getItem('token');
            this.httpClient
            .get('http://localhost:8080/api/user/get_userGold?token='+ token )
            .subscribe( (data : any) => {
            resolve( data );
            });
        })
    
    }
    
    onLoginSuccess(){
        let token : string = localStorage.getItem('token');
        //load user gold ? 

        //check if user got nickname if not display modal
        let getNickName = new Promise( (resolve, reject) => {

            this.httpClient
            .get('http://localhost:8080/api/user/get_user?token='+ token +'&fieldName=nickname' )
            .subscribe((data : any) => {
                resolve(data);
            });
        });

        getNickName.then(( nickname )=>{
            if( nickname === null ) 
                this.modalService.print( new modal( "Welcome", "Pls, fill the below input with your 'Player Name' =) ", "NickName" ) );
        }).catch(()=>{
            console.log('Error when fetch nickname');
        })

    }
}