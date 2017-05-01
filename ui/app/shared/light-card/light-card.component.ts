import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'oe-light-card',
  templateUrl: './light-card.component.html',
  styleUrls: ['./light-card.component.scss']
})
export class LightCardComponent {

    @Input() entity: any;
    @Output() addOrRemoveToFavChange: EventEmitter<any> = new EventEmitter();
    @Output() isFavChange: EventEmitter<any> = new EventEmitter();
    @Output() isLikedChange: EventEmitter<any> = new EventEmitter();
    @Output() likeOrDislikeChange: EventEmitter<any> = new EventEmitter();
    @Output() visitChange: EventEmitter<any> = new EventEmitter();


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

    visit(entity) {
        this.visitChange.emit(entity);
  }

}
