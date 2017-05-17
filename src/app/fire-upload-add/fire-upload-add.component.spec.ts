import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FireUploadAddComponent } from './fire-upload-add.component';

describe('FireUploadAddComponent', () => {
  let component: FireUploadAddComponent;
  let fixture: ComponentFixture<FireUploadAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FireUploadAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FireUploadAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
