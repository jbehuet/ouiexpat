import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'oe-legal',
  templateUrl: './legal.component.html',
  styleUrls: ['./legal.component.scss']
})
export class LegalComponent implements OnInit {

  public section:string = 'cgu';

  constructor() { }

  ngOnInit() {
  }

}
