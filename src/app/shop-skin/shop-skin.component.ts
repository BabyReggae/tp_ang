import { Component, OnInit, Input } from '@angular/core';
import { ShopComponent } from '../shop/shop.component';

@Component({
  selector: 'app-shop-skin',
  templateUrl: './shop-skin.component.html',
  styleUrls: ['./shop-skin.component.scss']
})
export class ShopSkinComponent implements OnInit {
  
  

  @Input() name :string;
  @Input() price : string;
  @Input() img:string;
  @Input() index:number;
  @Input() owned:boolean;

  constructor( private shop : ShopComponent ) { }

  ngOnInit() {
  }

  onPurchase( index:number ){
    this.shop.purchase( index );
  }


}
