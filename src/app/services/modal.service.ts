import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { modal } from '../models/modal.model';
import { AlertService } from '../alert';
import { promise } from 'protractor';
import { HttpClient } from '@angular/common/http';
import { FormControl, Validators } from '@angular/forms';
import { User } from '../models/User.model';
import * as sha256 from 'js-sha256';

@Injectable()
export class ModalService{

    constructor(private alertService:AlertService, private httpClient : HttpClient ){
    }

    /* *************************************************** */
    /* *************************************************** */
    /* *************************************************** */

    modalSubject = new Subject<any[]>();
    modal:modal;

    //stack user info on setting modif then spread it to setting module
    userSubject = new Subject<any[]>();
    user:User = new User();

    /* *************************************************** */
    /* *************************************************** */
    /* *************************************************** */

    emitModalSubject(){
        this.modalSubject.next( [{...this.modal} ] );
    }

    emitUserSubject(){
        this.userSubject.next( [{...this.user} ] );
    }

    reloadUserData(){
        
        let fetchUserData = new Promise( (resolve, reject )=>{

            let token : string = localStorage.getItem('token');
            this.httpClient
            .get('http://localhost:8080/api/user/get_all?token='+token )
            .subscribe( (data : any) => {
                if(data === false ) reject(data);
                console.log( data );
                resolve( data );
            });

        })

        fetchUserData.then((data:any)=>{
            this.user = new User( data.user_name ,data.nickname, data.email, data.gold );
            this.emitUserSubject();
        }).catch((truc)=>{
            this.alertService.error('error')
        }) 

    }
    /* *************************************************** */
    /* *************************************************** */
    /* *************************************************** */

    onCloseModal(){
        this.modal.display = "false";
        this.emitModalSubject();
        this.reloadUserData();

    }

    getValfromForm( value:any ){

        if( value === "" ) return false;
        
        switch (this.modal.title) {
            case "Welcome":
                    this.updateNickName( value );
                break;
        
            case "Settings" : 
                    this.updateSettings( value , this.modal.inputLabel );
                break;

            case "Password" :
                this.verifyPassword( value );
                break;

            case "New Password" :
                this.updatePassword( value );
                break;

            default:
                console.log("default case b1atch");
                break;
        }


        
    }

    print( modalData : modal ){
        this.modal = modalData;
        this.emitModalSubject();
    }

    /* *************************************************** */
    /* *************************************************** */
    /* *************************************************** */

    //FOR EACH POSSIBLE POP UP 

    updateSettings(  value:any, field:any ){
        let process:any = "VALID";
        if( field === "email" ) {let rslt = new FormControl( value , Validators.email); process = rslt.status };
        if( process !== "VALID" ) {this.alertService.error('pls verify the @mail format'); return false};

        let tryToUpdate = new Promise( (resolve, reject )=>{

            let token : string = localStorage.getItem('token');
            this.httpClient
            .post('http://localhost:8080/api/user/upd_user' , { token :token , fieldName : field, fieldValue : value })
            .subscribe( (data : any) => {
                if( data === true )  resolve( data );else reject( data );
            });

        })

        tryToUpdate.then((data)=>{
            this.alertService.success('Mise à jour réussie ! ');
        }).catch((truc)=>{
            this.alertService.error('La mise à jour à échouer :s ')
        }) 

        this.reloadUserData();
        this.onCloseModal();
    }

    updateNickName( name:any ){

        let tryToUpdate = new Promise( (resolve, reject )=>{

            let token : string = localStorage.getItem('token');
            this.httpClient
            .post('http://localhost:8080/api/user/upd_user' , { token :token , fieldName : "nickname", fieldValue : name })
            .subscribe( (data : any) => {
                console.log('FROM Nodejs => ', data );
                if( data === true )  resolve( data );else reject( data );
            });

        })

        tryToUpdate.then((data)=>{
            this.alertService.success('Mise à jour réussie ! ');
        }).catch((truc)=>{
            this.alertService.error('La mise à jour à échouer :s ')
        })

        this.onCloseModal();
    }


    verifyPassword( pwd:any ){
        let submittedPwd:any = sha256.sha256( pwd );
        let token : string = localStorage.getItem('token');

        this.httpClient
        .get('http://localhost:8080/api/user/get_all?token='+token)
        .subscribe( (data : any) => {
            if( data.password === submittedPwd ) {
                this.onCloseModal();
                this.print( new modal("New Password" , "Enter your new password below " , "pwd" , "" ));
            }else{
                this.alertService.error('Le pwd ne correspond pas !');
                this.onCloseModal();
            }
        });
    }

    updatePassword( pwd:any ){
        let submittedPwd:any = sha256.sha256( pwd );
        this.updateSettings( submittedPwd, "password" );
    }


}