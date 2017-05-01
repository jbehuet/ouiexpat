import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'oe-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent{


  @Input() entity: any;
  @Output() addOrRemoveToFavChange: EventEmitter<any> = new EventEmitter();
  @Output() isFavChange: EventEmitter<any> = new EventEmitter();
  @Output() isLikedChange: EventEmitter<any> = new EventEmitter();
  @Output() likeOrDislikeChange: EventEmitter<any> = new EventEmitter();
  @Output() seeDetailChange: EventEmitter<any> = new EventEmitter();


  addOrRemoveToFav(entity){
    this.addOrRemoveToFavChange.emit(entity);
  }

  isFav(entity){
    this.isFavChange.emit(entity);
  }

  isLiked(entity) {
    this.isLikedChange.emit(entity);
  }

  likeOrDislike(entity) {
    this.likeOrDislikeChange.emit(entity);
  }

  seeDetail(entity) {
    this.seeDetailChange.emit(entity);
  }
}


