import { Component, OnInit, AfterViewInit, Input, OnChanges } from '@angular/core';
import * as L from 'leaflet';
import { Map } from 'leaflet';

@Component({
    selector: 'leaflet',
    template: `<div id="map" class="leaflet-map"></div>`,
    styles: ['.leaflet-map { width: 300px; height: 300px; }']
})
export class LeafletComponent implements OnInit, AfterViewInit, OnChanges {

    @Input() location?: Array<Number> = [32.9866, -96.9271]

    private _map: Map;

    constructor() {
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this._map = new L.Map('map', { zoomControl: false, doubleClickZoom: false }).setView(this.location, 9);

        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(this._map);

        const defaultIcon = L.icon({ iconUrl: '/assets/marker-icon.png', shadowUrl: '/assets/marker-shadow.png' });
        L.Marker.prototype.options.icon = defaultIcon;

        L.marker(this.location).addTo(this._map);
    }


    ngOnChanges(changes: any) {
        //if (changes.location)
        //    this.location = changes.location
        //L.marker(this.location).addTo(this._map);
    }

}
