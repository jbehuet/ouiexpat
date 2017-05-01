import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'oe-light-card',
  templateUrl: './light-card.component.html',
  styleUrls: ['./light-card.component.scss']
})
export class LightCardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  visit(entity) {
    if (!(/^https?:\/\//).test(entity.link))
      entity.link = 'http://' + entity.link
    window.open(entity.link);
  }

}
