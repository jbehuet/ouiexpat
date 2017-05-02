import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'oe-light-card',
  templateUrl: './light-card.component.html',
  styleUrls: ['./light-card.component.scss']
})
export class LightCardComponent {

    @Input() entity: any;
    @Input() isFav: boolean;
    @Input() isLiked: boolean;
    @Output() addOrRemoveToFavChange: EventEmitter<any> = new EventEmitter();
    @Output() likeOrDislikeChange: EventEmitter<any> = new EventEmitter();
    @Output() visitChange: EventEmitter<any> = new EventEmitter();


    addOrRemoveToFav(entity){
        this.addOrRemoveToFavChange.emit(entity);
    }

    likeOrDislike(entity) {
        this.likeOrDislikeChange.emit(entity);
    }

    visit(entity) {
        this.visitChange.emit(entity);
  }

}
