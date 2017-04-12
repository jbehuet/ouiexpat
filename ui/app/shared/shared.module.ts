import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterializeModule } from 'angular2-materialize';

import { AlgoliaPlacesComponent } from './algolia-places/algolia-places.component';
import { DateInlineComponent } from './date-inline/date-inline.component';
import { LeafletComponent } from './leaflet/leaflet.component';

@NgModule({
  imports: [
    CommonModule,
    MaterializeModule
  ],
  declarations: [
       AlgoliaPlacesComponent,
       DateInlineComponent,
       LeafletComponent
  ],
  exports: [
      AlgoliaPlacesComponent,
      DateInlineComponent,
      LeafletComponent
  ]
})
export class SharedModule { }
