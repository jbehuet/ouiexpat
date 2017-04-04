import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DateInlineComponent } from './date-inline.component';

describe('DateInlineComponent', () => {
  let component: DateInlineComponent;
  let fixture: ComponentFixture<DateInlineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DateInlineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateInlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
