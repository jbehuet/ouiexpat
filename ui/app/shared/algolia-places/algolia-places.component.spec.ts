import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlgoliaPlacesComponent } from './algolia-places.component';

describe('AlgoliaPlacesComponent', () => {
  let component: AlgoliaPlacesComponent;
  let fixture: ComponentFixture<AlgoliaPlacesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlgoliaPlacesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlgoliaPlacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
