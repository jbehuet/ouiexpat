import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HappyexpatTabsComponent } from './happyexpat-tabs.component';

describe('HappyexpatTabsComponent', () => {
  let component: HappyexpatTabsComponent;
  let fixture: ComponentFixture<HappyexpatTabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HappyexpatTabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HappyexpatTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
