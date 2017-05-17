import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YoutubeChannelsComponent } from './youtube-channels.component';

describe('YoutubeChannelsComponent', () => {
  let component: YoutubeChannelsComponent;
  let fixture: ComponentFixture<YoutubeChannelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YoutubeChannelsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YoutubeChannelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
