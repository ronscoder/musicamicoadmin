import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddYoutubeResourceComponent } from './add-youtube-resource.component';

describe('AddYoutubeResourceComponent', () => {
  let component: AddYoutubeResourceComponent;
  let fixture: ComponentFixture<AddYoutubeResourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddYoutubeResourceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddYoutubeResourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
