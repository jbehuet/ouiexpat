import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'oe-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements OnInit {

  @Input() expatriation: any = [];
  @Input() empty: boolean = false;

  constructor() { }

  ngOnInit() {
    
  }

}
