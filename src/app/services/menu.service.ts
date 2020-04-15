import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable()
export class MenuService{
    menuSubject = new Subject<any[]>();
    public menuRouting : Array<any> = [
        { name : "Jouer" , path : "sologame" },//k
        { name : "Boutique" , path : "shop" },
        { name : "Profil" , path : "profil" },
        { name : "Classement" , path : "rank" },
        { name : "Paramêtres" , path : "settings" },
        { name : "Deconnexion" , path : "logout" }
    ];


    constructor(){

    }

    emitMenuSubject(){
        this.menuSubject.next(this.menuRouting.slice());
    }




}