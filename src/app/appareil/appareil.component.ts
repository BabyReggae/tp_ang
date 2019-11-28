import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-appareil',
  templateUrl: './appareil.component.html',
  styleUrls: ['./appareil.component.scss']
})
export class AppareilComponent implements OnInit {


  //appareilName = "un joli nom d'appareil :) ";
  @Input() appareilName :string;
  appareilStatut = 0; 

  constructor() { }

  ngOnInit() {
  }

  getStatut(){
    return this.appareilStatut;
  }
}
