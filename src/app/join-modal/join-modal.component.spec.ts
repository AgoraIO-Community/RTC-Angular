import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinModalComponent } from './join-modal.component';

describe('JoinModalComponent', () => {
  let component: JoinModalComponent;
  let fixture: ComponentFixture<JoinModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JoinModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JoinModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
