import {Component, Input, OnInit} from '@angular/core';
import {Review} from '../../_interfaces/review.interface';

@Component({
  selector: 'oe-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {

  @Input() review: Review;

  constructor() { }

  ngOnInit() {
  }

}
