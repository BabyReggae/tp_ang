import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AlertService } from '../alert';

declare var $:any;

@Injectable()
export class ShopService {

    constructor( private httpClient: HttpClient, private router: Router , protected alertService: AlertService ){}

    skins : Array<any>


    

}