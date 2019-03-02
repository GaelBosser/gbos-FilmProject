import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFilmPage } from './listFilm.page';

describe('ListFilmPage', () => {
  let component: ListFilmPage;
  let fixture: ComponentFixture<ListFilmPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListFilmPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListFilmPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
