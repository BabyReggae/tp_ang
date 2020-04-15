import { Component, OnInit, Input } from '@angular/core';
import { AppareilService } from '../services/appareil.service';

@Component({
  selector: 'app-appareil',
  templateUrl: './appareil.component.html',
  styleUrls: ['./appareil.component.scss']
})
export class AppareilComponent implements OnInit {


  //appareilName = "un joli nom d'appareil :) ";
  @Input() appareilName :string;
  @Input() csInfo : string;

  @Input() appareilStatut:number;
  @Input() index:number;
  //appareilStatut = 0; 

  constructor(private appareilService: AppareilService) {

    console.log( "coucou" );
  }

  ngOnInit() {
  }

  getStatut(){
    return this.appareilStatut;
  }

  onSwitch() {
    if(this.appareilStatut === 1) {
      this.appareilService.switchOffOne(this.index);
    } else if(this.appareilStatut === 0) {
      this.appareilService.switchOnOne(this.index);
    }
  }

}
