import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AlertService } from '../alert';
import { AppComponent } from '../app.component';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  shopImgPath:string = "./assets/img/testpack/";
  skins : Array<any>


  constructor(private httpClient: HttpClient, private router: Router , protected alertService: AlertService, private appComponent : AppComponent, private authService : AuthService) { }

  ngOnInit() {

    let loadSkin: Promise<any> = new Promise((resolve,reject)=>{

      this.httpClient
      .get('http://localhost:8080/api/skin/get_all' )
      .subscribe( (data : any) => {
        console.log('FROMM BDD SKINS => ' , data )
        resolve( data );
      });
    })

    loadSkin.then((val:Array<any>)=>{

      for (const line in val) {
        for(const prop in val[line]){
          if( prop === 'img_url' ) val[line][prop] = this.shopImgPath + val[line][prop];
        }
      }
      this.skins = val;
    })

    //now let load user own skins and add the .owned set to true for each userSkin
    let owned:Promise<any> = this.owned().then((ownedSkins)=>{
      for (const skin in this.skins) {
        if (this.skins.hasOwnProperty(skin)) {
          const element = this.skins[skin];
          ownedSkins.includes( element.id ) ? element.owned = true : element.owned = false;
        }
      }
    })


  }

  purchase( index:number ){

    // console.log( this.skins[ index ] );
    let token : string = localStorage.getItem('token');
    let askPurchase: Promise<any> = new Promise((resolve,reject)=>{
      this.httpClient
      .post('http://localhost:8080/api/skin/ask_skinPurchase' , { token : token , skin : this.skins[ index ] } )
      .subscribe( (data : any) => {
        resolve( data );
      });
    })

    askPurchase.then((data)=>{
      if( data ){
        this.alertService.success('Achat effectué avec succes !' , { autoClose : true });
        this.skins[ index ].owned = true;
        this.authService.playerGold().then((gold)=>{
          this.appComponent.updatePlayerGold( gold );
        })
        
      }
      else
        this.alertService.error('Il faut jouer plus, sorry ! ^^' , { autoClose : true });
    })

  }

  owned(){
    let ownedSkins:Array<number>
    let token : string = localStorage.getItem('token');

    let loadOwnedSkins: Promise<any> = new Promise((resolve,reject)=>{
      this.httpClient
      .get('http://localhost:8080/api/skin/get_userOwned?token='+token )
      .subscribe( (data : any) => {
        resolve( data );
      });
    })

    return loadOwnedSkins;
  }




}
