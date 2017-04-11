import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import places from 'places.js';

@Component({
    selector: 'algolia-places',
    template: `
        <div class="input-field">
            <input id="location" placeholder="Adresse" name="location" type="text" class="validate" required="{{required}}">
            <label for="location" *ngIf="label">{{label}}</label>
        </div>
  `,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => AlgoliaPlacesComponent),
            multi: true
        }
    ]
})
export class AlgoliaPlacesComponent implements OnInit, ControlValueAccessor {

    @Input() private label?: String = '';
    @Input() private required?: Boolean = true;
    //Internal value
    @Input() place;

    onChange: any = () => { };
    onTouched: any = () => { };

    private placesAutocomplete;

    get value() {
        return this.place;
    }

    set value(value) {
        this.place = value;
        this.onChange(value);
    }

    constructor() {
    }

    ngOnInit(){
      this.placesAutocomplete = places({
          container: document.querySelector('#location')
      });

      this.placesAutocomplete.on('change', e => {
        this.place = e.suggestion
        this.onChange(this.place);
      });

    }

    writeValue(value) {
        if (value) {
            this.place = value;
            this.placesAutocomplete.setVal(this.place.value)
        }
    }

    registerOnChange(fn) {
        this.onChange = fn;
    }

    registerOnTouched(fn) {
        this.onTouched = fn;
    }

}
