import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumArtistComponent } from './album-artist.component';

describe('AlbumArtistComponent', () => {
  let component: AlbumArtistComponent;
  let fixture: ComponentFixture<AlbumArtistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlbumArtistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumArtistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
