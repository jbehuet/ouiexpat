import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Review } from '../../_interfaces/review.interface';
import { User } from '../../_interfaces/user.interface';

@Component({
  selector: 'oe-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {

  @Input() review: Review;
  @Input() currentUser: User;
  @Output() onDelete: EventEmitter<any> = new EventEmitter();
  @Output() onEdit: EventEmitter<any> = new EventEmitter();

  public editing:Boolean = false;

  constructor() { }

  ngOnInit() {
  }

  delete() {
    this.onDelete.emit(this.review);
    this.editing = false;
  }

  edit(form: NgForm) {
    this.onEdit.emit(form.value);
    form.reset();
    this.editing = false
  }

}
