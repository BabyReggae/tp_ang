import { Component, OnInit, Input } from '@angular/core';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { faThumbsDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  //ICONS 
  faThumbsUp = faThumbsUp;
  faThumbsDown = faThumbsDown;
  
  
  @Input() title :string;
  @Input() content:string;
  @Input() loveIts:number;
  @Input() created_at:object;

  constructor() { }

  ngOnInit() {
  }

  onDownLike(){
    this.loveIts -= 1; 
  }
  onUpLike(){
    this.loveIts += 1;
  }
}
