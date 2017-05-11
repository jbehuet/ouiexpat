import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'oe-job-card',
  templateUrl: './job-card.component.html',
  styleUrls: ['./job-card.component.scss']
})
export class JobCardComponent implements OnInit {

  @Input() job: any;
  @Input() isFav: boolean;
  @Output() addOrRemoveToFavChange: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  addOrRemoveToFav(job) {
    this.addOrRemoveToFavChange.emit(job);
  }

  call(){
    if (!(/^tel?:/).test(this.job.phone.number))
      this.job.phone.number = 'tel:' + this.job.phone.number
    window.open(this.job.phone.number);
  }

  mailTo(){
    if (!(/^mailto?:\/\//).test(this.job.email))
      this.job.email = 'mailto://' + this.job.email
    window.open(this.job.email);
  }

  visit() {
    if (!(/^https?:\/\//).test(this.job.website))
      this.job.website = 'http://' + this.job.website
    window.open(this.job.website);
  }

}
