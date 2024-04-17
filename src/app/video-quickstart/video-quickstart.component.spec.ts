import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoQuickstartComponent } from './video-quickstart.component';

describe('VideoQuickstartComponent', () => {
  let component: VideoQuickstartComponent;
  let fixture: ComponentFixture<VideoQuickstartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoQuickstartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VideoQuickstartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
