import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable()
export class MenuService{
    menuSubject = new Subject<any[]>();

    public menuRouting : Array<any> = [
        { name : "Jouer" , path : "sologame" },//k
        { name : "Boutique" , path : "shop" },
        { name : "Profil" , path : "profil" },
        // { name : "Classement" , path : "rank" },
        { name : "Paramêtres" , path : "settings" },
        { name : "Deconnexion" , path : "logout" }
    ];

    public rootRouting : Array<any> = [
        { name : "Jouer" , path : "sologame"  },//k
        { name : "Boutique" , path : "shop"  },
        { name : "Profil" , path : "profil"  },
        // { name : "Classement" , path : "rank" },
        { name : "Paramêtres" , path : "settings"  },
        { name : "Deconnexion" , path : "logout"  }
    ];
    
    public allRouting : Array<any> = [
        //UNLOG 
        { name : "loginPage" , path : "auth" , prev : 'root' },

        //ROOT
        { name : "Jouer" , path : "sologame" , prev : 'root' },//k
        { name : "Boutique" , path : "shop" , prev : 'root' },
        { name : "Profil" , path : "profil" , prev : 'root' },
        { name : "Classement" , path : "rank", prev : 'root' },
        { name : "Paramêtres" , path : "settings" , prev : 'root' },
        { name : "Deconnexion" , path : "logout" , prev : 'root' },

        //SHOP
        // { name : "Boutique" , path : "shop" , prev : 'shop' },//shop main
        { name : "Possédés" , path : "shopowned" , prev : 'shop' },
        { name : "Promotion" , path : "shoppromotion" , prev : 'shop' }

    ]




    constructor(){

    }

    emitMenuSubject(){
        this.menuSubject.next(this.menuRouting.slice());
    }

    set_newMenuBoard( url : any ){
        console.log( url );
        url.cur = url.cur.replace('/', '');
        url.prev = url.prev.replace('/', '');

        let curPathObj = this.allRouting.find(e => e.path == url.cur );
        let routingObj:Array<any> = [];

        for (const route in this.allRouting) {
            if (this.allRouting.hasOwnProperty(route)) {
                const element = this.allRouting[route];
                

                if( element.prev === url.cur ) routingObj.push( element );
                //es que url.url a des collégue dans element.prev
            }
        }
        
        //if we find under_path to the cur_path
        if( routingObj.length !== 0 ) {
            routingObj.unshift( curPathObj  );
            routingObj.unshift( { name : 'Retour', path : curPathObj.prev })
        }else{
            //if no under_path 2options => 1 we arrived at root, 2 we'are the deepest we can go in dat path
            if( curPathObj.prev === "root" ) 
                routingObj = this.rootRouting;
            else 
                routingObj = this.menuRouting;
            //in fact they arnt any thing to do in order to prevent menuTo change
            
        }

        this.menuRouting = routingObj;
        this.emitMenuSubject();

    }



}