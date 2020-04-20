import { Component, OnInit, Input } from '@angular/core';
import { ModalService } from '../services/modal.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-cs-modal',
  templateUrl: './cs-modal.component.html',
  styleUrls: ['./cs-modal.component.scss']
})
export class CsModalComponent implements OnInit {

  @Input() title:string;
  @Input() bodyText:string;
  @Input() inputLabel:string;

  constructor( private modalService : ModalService ) { }

  ngOnInit() {
  }

  closeModal(){
    this.modalService.onCloseModal();
  }

  onSubmitForm( form : NgForm ){
    let val = form.value.inputVal;
    this.modalService.getValfromForm( val );
  }

}
