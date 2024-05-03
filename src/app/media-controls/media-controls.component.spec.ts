import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaControlsComponent } from './media-controls.component';

describe('MediaControlsComponent', () => {
  let component: MediaControlsComponent;
  let fixture: ComponentFixture<MediaControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MediaControlsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MediaControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
