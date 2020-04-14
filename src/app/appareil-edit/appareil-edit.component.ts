import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppareilService } from '../services/appareil.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-appareil-edit',
  templateUrl: './appareil-edit.component.html',
  styleUrls: ['./appareil-edit.component.scss']
})
export class AppareilEditComponent implements OnInit {


  constructor(private appareilService: AppareilService,
    private router: Router) { }

  ngOnInit() {
    this.appareilService.logFromBdd();
    console.log("JUST ABOVE");
  }

  onSubmit(form: NgForm) {
    console.log( form );
    const name = form.value['name'];
    const status = form.value['status'];
    this.appareilService.addAppareil(name, status);
    this.router.navigate(['/appareils']);
  }

}
