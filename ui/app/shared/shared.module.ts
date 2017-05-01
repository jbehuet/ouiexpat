import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterializeModule} from 'angular2-materialize';

import {AlgoliaPlacesComponent} from './algolia-places/algolia-places.component';
import {DateInlineComponent} from './date-inline/date-inline.component';
import {LeafletComponent} from './leaflet/leaflet.component';
import {CardComponent} from './card/card.component';
import {LightCardComponent} from './light-card/light-card.component';
import {CardDetailComponent} from './card-detail/card-detail.component';
import {TruncatePipe} from '../_pipes/truncate.pipe';

@NgModule({
  imports: [
    CommonModule,
    MaterializeModule
  ],
  declarations: [
      TruncatePipe,
      AlgoliaPlacesComponent,
      DateInlineComponent,
      LeafletComponent,
      CardComponent,
      LightCardComponent,
      CardDetailComponent
  ],
  exports: [
      AlgoliaPlacesComponent,
      DateInlineComponent,
      LeafletComponent,
      CardComponent,
      LightCardComponent,
      CardDetailComponent
  ],
    providers: []
})
export class SharedModule { }
