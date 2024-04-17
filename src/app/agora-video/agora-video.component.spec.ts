import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgoraVideoComponent } from './agora-video.component';

describe('AgoraVideoComponent', () => {
  let component: AgoraVideoComponent;
  let fixture: ComponentFixture<AgoraVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgoraVideoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgoraVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
