import { Component, OnInit, Input } from '@angular/core';
import { MenuService } from '../services/menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  @Input() pathName :string;
  @Input() pathUrl :string;
  @Input() index:number;

  constructor( private menuService : MenuService) {



  }

  ngOnInit() {



  }

}
