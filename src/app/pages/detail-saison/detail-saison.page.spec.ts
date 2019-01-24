import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailSaisonPage } from './detail-saison.page';

describe('DetailSaisonPage', () => {
  let component: DetailSaisonPage;
  let fixture: ComponentFixture<DetailSaisonPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailSaisonPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailSaisonPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
