import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSeriePage } from './listSerie.page';

describe('ListSeriePage', () => {
  let component: ListSeriePage;
  let fixture: ComponentFixture<ListSeriePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListSeriePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSeriePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
