import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriePage } from './favorie.page';

describe('FavoriePage', () => {
  let component: FavoriePage;
  let fixture: ComponentFixture<FavoriePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavoriePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
