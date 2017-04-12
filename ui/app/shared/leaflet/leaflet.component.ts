import { Component, OnInit, AfterViewInit, Input, OnChanges } from '@angular/core';
import * as L from 'leaflet';
import { Map, Marker } from 'leaflet';

@Component({
    selector: 'leaflet',
    template: `<div id="map" class="leaflet-map"></div>`,
    styles: ['.leaflet-map { min-width: 200px; min-height: 200px; }']
})
export class LeafletComponent implements OnInit, AfterViewInit, OnChanges {

    @Input() location?: Array<Number> = [32.9866, -96.9271]

    private _map: Map;
    private _marker: Marker;

    constructor() {
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this._map = new L.Map('map', { zoomControl: false, doubleClickZoom: false }).setView(this.location, 3);

        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(this._map);

        const defaultIcon = L.icon({
            iconUrl: '/assets/marker-icon.png',
            shadowUrl: '/assets/marker-shadow.png',
            iconAnchor: [12, 41]
        });
        L.Marker.prototype.options.icon = defaultIcon;

        this._marker = L.marker(this.location).addTo(this._map);
    }


    ngOnChanges(changes: any) {
        if (!changes.location.firstChange) {
            this.location = changes.location.currentValue;
            this._map.removeLayer(this._marker);
            this._marker = L.marker(this.location).addTo(this._map);
            this._map.panTo(this.location);
        }

    }

}
